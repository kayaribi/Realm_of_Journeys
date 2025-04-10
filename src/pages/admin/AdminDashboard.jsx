import { useEffect, useContext, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../store/CartContext.js";
import ReactLoading from 'react-loading';
import axios from "axios";
import { Modal } from "bootstrap";
import PropTypes from 'prop-types';

import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  origin_price: 1,
  price: 1,
  description: "",
  is_enabled: 0,
  imagesUrl: [""],
  departureCity: "",
  travelDate: "",
  leastPeopleNum: 1,
  unit: "人",
  contents: [
    { title: "", content: "" },
    { title: "", content: "" }
  ]
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const validateProduct = () => {
    const errors = {};
    if (!tempProduct.title.trim()) errors.title = "標題為必填";
    if (!tempProduct.category) errors.category = "分類為必選";
    if (!tempProduct.origin_price || tempProduct.origin_price <= 0) errors.origin_price = "原價必須為正整數";
    if (!tempProduct.price || tempProduct.price <= 0) errors.price = "售價必須為正整數";
    if (Number(tempProduct.price) > Number(tempProduct.origin_price)) {
      errors.price = "售價不可高於原價";
    }
    if (!tempProduct.description.trim()) errors.description = "描述為必填";
    if (!tempProduct.departureCity.trim()) errors.departureCity = "出發城市為必填";
    if (!tempProduct.travelDate.trim()) errors.travelDate = "行程日期為必填";
    if (!tempProduct.leastPeopleNum || tempProduct.leastPeopleNum <= 0) errors.leastPeopleNum = "成團人數必須大於 0";
    if (!tempProduct.imageUrl.trim()) errors.imageUrl = "主圖為必填";

    tempProduct.contents.forEach((c, index) => {
      if (!c.title.trim()) errors[`contents.${index}.title`] = `行程特色 ${index + 1} 標題為必填`;
      if (!c.content.trim()) errors[`contents.${index}.content`] = `行程特色 ${index + 1} 內容為必填`;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token || !isAdminLoggedIn) {
      navigate("/admin");
    } else {
      axios.defaults.headers.common["Authorization"] = token;
    }
  }, [navigate, isAdminLoggedIn]);

  // ✅ 放在 useEffect 外面
  const getProducts = useCallback(async (page = 1, category = selectedCategory) => {
    setIsScreenLoading(true);
    try {
      let url = `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`;
      if (category !== "全部") {
        url += `&category=${category}`;
      }

      const res = await axios.get(url);
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      console.error("請求失敗", error);
      Swal.fire({
        title: "請求失敗",
        text: "請稍後再試",
        icon: "error",
        confirmButtonText: "確定",
      });
    } finally {
      setIsScreenLoading(false);
    }
  }, [selectedCategory]); // ✅ 加入依賴

  useEffect(() => {
    getProducts(); // ✅ 安全使用 getProducts
  }, [getProducts]); // ✅ 加入依賴

  const productModalRef = useRef(null);
  const delProductModalRef = useRef(null);
  const [modalMode, setModalMode] = useState(null);

  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
    new Modal(delProductModalRef.current, {
      backdrop: false,
    });
  }, []);

  const handleOpenProductModal = (mode, product) => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct(defaultModalState);
        break;
      case "edit":
        setTempProduct(product);
        break;
      default:
        break;
    }

    modalInstance.show();
  }

  const handleCloseProductModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  }

  const handleOpenDelProductModal = (product) => {
    setTempProduct(product);
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.show();
  }

  const handleCloseDelProductModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
  }

  const [tempProduct, setTempProduct] = useState(defaultModalState);

  const handleModalInputChange = (e) => {
    const { value, name, checked, type } = e.target;

    // 處理巢狀物件 (contents)
    if (name.includes('.')) {
      const [field, index, subField] = name.split('.');
      if (field === 'contents') {
        const newContents = [...tempProduct.contents];
        newContents[index] = {
          ...newContents[index],
          [subField]: value
        };
        setTempProduct({
          ...tempProduct,
          contents: newContents
        });
        return;
      }
    }

    // 處理一般欄位
    setTempProduct({
      ...tempProduct,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...tempProduct.imagesUrl];
    newImages[index] = value;
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages
    });
  }

  const handleAddImage = () => {
    const newImages = [...tempProduct.imagesUrl, ""];
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages
    });
  }

  const handleRemoveImage = () => {
    const newImages = [...tempProduct.imagesUrl];
    newImages.pop();
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages
    });
  }

  const createProduct = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, {
        data: {
          ...tempProduct,
          origin_price: Number(tempProduct.origin_price),
          price: Number(tempProduct.price),
          is_enabled: tempProduct.is_enabled ? 1 : 0
        }
      });
      await Swal.fire({
        title: "新增產品成功",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "請稍後再試";
      Swal.fire({
        title: "新增產品失敗",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`, {
        data: {
          ...tempProduct,
          origin_price: Number(tempProduct.origin_price),
          price: Number(tempProduct.price),
          is_enabled: tempProduct.is_enabled ? 1 : 0
        }
      });
      await Swal.fire({
        title: "編輯產品成功",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "請稍後再試";
      Swal.fire({
        title: "編輯產品失敗",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const deleteProduct = async () => {
    const result = await Swal.fire({
      title: "確定要刪除嗎？",
      text: "刪除後將無法恢復",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定刪除",
      cancelButtonText: "取消",
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`);

      await Swal.fire({
        title: "刪除成功",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "請稍後再試";
      Swal.fire({
        title: "刪除失敗",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!validateProduct()) {
      Swal.fire({
        title: "欄位驗證錯誤",
        text: "請確認所有必填欄位都已填寫正確",
        icon: "warning",
        confirmButtonText: "確定"
      });
      return;
    }

    const apiCall = modalMode === "create" ? createProduct : updateProduct;
    try {
      await apiCall();
      getProducts();
      handleCloseProductModal();
    } catch (error) {
      console.error("更新產品失敗", error);
      Swal.fire({
        title: "操作失敗",
        text: "請稍後再試或聯絡管理員",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct();
      getProducts();
      handleCloseDelProductModal();
    } catch (error) {
      console.error("刪除產品失敗", error);
    }
  };

  const ChevronLeft = ({ className }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 17l-5-5 5-5M18 17l-5-5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  ChevronLeft.propTypes = {
    className: PropTypes.string
  };

  const ChevronRight = ({ className }) => (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 17l5-5-5-5M6 17l5-5-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  ChevronRight.propTypes = {
    className: PropTypes.string
  };

  const [pageInfo, setPageInfo] = useState({});

  const handlePageChange = (page) => {
    getProducts(page, selectedCategory);
  };

  // 首先創建一個生成分頁數組的函數
  const generatePagination = (currentPage, totalPages) => {
    const safeTotal = totalPages < 1 ? 1 : totalPages; // 保證至少 1 頁
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(safeTotal - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (safeTotal > 1) {
      range.unshift(1);
      range.push(safeTotal);
    } else {
      range.push(1);
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload", file);
    axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/upload`, formData)
      .then((res) => {
        setTempProduct({
          ...tempProduct,
          imageUrl: res.data.imageUrl
        });
        Swal.fire({
          title: "上傳圖片成功",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("上傳圖片失敗", error);
        Swal.fire({
          title: "上傳圖片失敗",
          text: "請注意，僅限使用 jpg、jpeg 與 png 格式，檔案大小限制為 3MB 以下",
          icon: "error",
          confirmButtonText: "確定",
        });
      });
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="fs-4">產品列表</h2>
              <div className="d-flex align-items-center">
                <label htmlFor="categoryFilter" className="me-2 mb-0">分類：</label>
                <select
                  id="categoryFilter"
                  className="form-select"
                  style={{ width: "150px" }}
                  value={selectedCategory}
                  onChange={(e) => {
                    const newCategory = e.target.value;
                    setSelectedCategory(newCategory);
                    getProducts(1, newCategory); // 切換分類時從第一頁開始載入
                  }}
                >
                  <option value="全部">全部</option>
                  <option value="亞洲">亞洲</option>
                  <option value="歐洲">歐洲</option>
                  <option value="中東">中東</option>
                </select>
              </div>
              <button onClick={() => handleOpenProductModal("create")} type="button" className="btn btn-primary ms-3">
                建立新的產品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">
                      {product.title.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? (<span className="text-success">啟用</span>) : (<span>未啟用</span>)}</td>
                    <td>
                      <div className="btn-group">
                        <button onClick={() => handleOpenProductModal('edit', product)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                        <button onClick={() => handleOpenDelProductModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center adminDashboard">
            {pageInfo.total_pages >= 1 && (
              <nav>
                <ul className="pagination">
                  {/* 上一頁 */}
                  <li className={`page-item page-item-bullet ${!pageInfo.has_pre ? "disabled" : ""}`}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageInfo.has_pre) {
                          handlePageChange(pageInfo.current_page - 1);
                        }
                      }}
                    >
                      <ChevronLeft className="pagination-arrow" />
                    </a>
                  </li>

                  {/* 分頁數字 */}
                  {generatePagination(pageInfo.current_page, pageInfo.total_pages).map((page, index) => (
                    <li
                      key={index}
                      className={`page-item page-item-bullet ${page === pageInfo.current_page ? "active" : ""
                        } ${page === "..." ? "disabled" : ""}`}
                    >
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          if (page !== "...") {
                            handlePageChange(page);
                          }
                        }}
                        className="page-link"
                        href="#"
                        style={{ cursor: page === "..." ? "default" : "pointer" }}
                      >
                        {page}
                      </a>
                    </li>
                  ))}

                  {/* 下一頁 */}
                  <li className={`page-item page-item-bullet ${!pageInfo.has_next ? "disabled" : ""}`}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageInfo.has_next) {
                          handlePageChange(pageInfo.current_page + 1);
                        }
                      }}
                    >
                      <ChevronRight className="pagination-arrow" />
                    </a>
                  </li>
                </ul>
              </nav>
            )}

          </div>
        </div>
      </div>
      {/* 新增產品 Modal */}
      <div ref={productModalRef} id="productModal" className="modal adminDashboard" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">{modalMode === "create" ? "新增產品" : "編輯產品"}</h5>
              <button onClick={handleCloseProductModal} type="button" className="btn-close" aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="mb-5">
                    <label htmlFor="fileInput" className="form-label"> 圖片上傳 </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="primary-image" className="form-label">主圖</label>
                    <div className="input-group">
                      <input
                        value={tempProduct.imageUrl}
                        onChange={handleModalInputChange}
                        name="imageUrl"
                        type="text"
                        id="primary-image"
                        className="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    {formErrors.imageUrl && <div className="text-danger small">{formErrors.imageUrl}</div>}
                    <img src={tempProduct.imageUrl} alt={tempProduct.title} className="img-fluid" />
                  </div>

                  {/* 副圖 */}
                  <div className="border border-2 border-dashed rounded-3 p-3">
                    {tempProduct.imagesUrl?.map((image, index) => (
                      <div key={index} className="mb-2">
                        <label htmlFor={`imagesUrl-${index + 1}`} className="form-label">
                          副圖 {index + 1}
                        </label>
                        <input
                          value={image}
                          onChange={(e) => handleImageChange(e, index)}
                          id={`imagesUrl-${index + 1}`}
                          type="text"
                          placeholder={`圖片網址 ${index + 1}`}
                          className="form-control mb-2"
                        />
                        {image && (
                          <img src={image} alt={`副圖 ${index + 1}`} className="img-fluid mb-2" />
                        )}
                      </div>
                    ))}
                    <div className="btn-group w-100">
                      {tempProduct.imagesUrl.length < 4 && tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] !== "" && (<button onClick={handleAddImage} className="btn btn-outline-primary btn-sm w-100">新增圖片</button>)}
                      {tempProduct.imagesUrl.length > 1 && (<button onClick={handleRemoveImage} className="btn btn-outline-danger btn-sm w-100">取消圖片</button>)}
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">標題</label>
                    <textarea
                      value={tempProduct.title}
                      onChange={handleModalInputChange}
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      rows="2"
                      placeholder="請輸入標題"
                    />
                    {formErrors.title && <div className="text-danger small">{formErrors.title}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">分類</label>
                    <select
                      value={tempProduct.category}
                      onChange={handleModalInputChange}
                      name="category"
                      id="category"
                      className="form-control"
                    >
                      <option value="">請選擇分類</option>
                      <option value="亞洲">亞洲</option>
                      <option value="歐洲">歐洲</option>
                      <option value="中東">中東</option>
                    </select>
                    {formErrors.category && <div className="text-danger small">{formErrors.category}</div>}
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label htmlFor="origin_price" className="form-label">原價</label>
                      <input
                        value={tempProduct.origin_price}
                        onChange={handleModalInputChange}
                        name="origin_price"
                        id="origin_price"
                        type="number"
                        className="form-control"
                        placeholder="請輸入原價"
                        min="1"
                      />
                      {formErrors.origin_price && <div className="text-danger small">{formErrors.origin_price}</div>}
                    </div>
                    <div className="col-6">
                      <label htmlFor="price" className="form-label">售價</label>
                      <input
                        value={tempProduct.price}
                        onChange={handleModalInputChange}
                        name="price"
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="請輸入售價"
                        min="1"
                      />
                      {formErrors.price && <div className="text-danger small">{formErrors.price}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">產品描述</label>
                    <textarea
                      value={tempProduct.description}
                      onChange={handleModalInputChange}
                      name="description"
                      id="description"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入產品描述"
                    ></textarea>
                    {formErrors.description && <div className="text-danger small">{formErrors.description}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">行程特色1</label>
                    <input
                      value={tempProduct.contents[0].title}
                      onChange={handleModalInputChange}
                      name="contents.0.title"
                      className={`form-control ${formErrors["contents.0.title"] ? "mb-0" : "mb-2"}`}
                      placeholder="請輸入行程特色標題"
                    />
                    {formErrors["contents.0.title"] && (
                      <div className="text-danger mb-2 small">{formErrors["contents.0.title"]}</div>
                    )}
                    <textarea
                      value={tempProduct.contents[0].content}
                      onChange={handleModalInputChange}
                      name="contents.0.content"
                      className={`form-control ${formErrors["contents.0.content"] ? "mb-0" : "mb-2"}`}
                      placeholder="請輸入行程特色內容"
                    ></textarea>
                    {formErrors["contents.0.content"] && (
                      <div className="text-danger mb-2 small">{formErrors["contents.0.content"]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">行程特色2</label>
                    <input
                      value={tempProduct.contents[1].title}
                      onChange={handleModalInputChange}
                      name="contents.1.title"
                      className={`form-control ${formErrors["contents.1.title"] ? "mb-0" : "mb-2"}`}
                      placeholder="請輸入行程特色標題"
                    />
                    {formErrors["contents.1.title"] && (
                      <div className="text-danger mb-2 small">{formErrors["contents.1.title"]}</div>
                    )}
                    <textarea
                      value={tempProduct.contents[1].content}
                      onChange={handleModalInputChange}
                      name="contents.1.content"
                      className={`form-control ${formErrors["contents.1.content"] ? "mb-0" : "mb-2"}`}
                      placeholder="請輸入行程特色內容"
                    ></textarea>
                    {formErrors["contents.1.content"] && (
                      <div className="text-danger mb-2 small">{formErrors["contents.1.content"]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="departureCity" className="form-label">出發城市</label>
                    <input
                      value={tempProduct.departureCity}
                      onChange={handleModalInputChange}
                      name="departureCity"
                      id="departureCity"
                      type="text"
                      className="form-control"
                      placeholder="請輸入出發城市"
                    />
                    {formErrors.departureCity && <div className="text-danger small">{formErrors.departureCity}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="travelDate" className="form-label">行程日期</label>
                    <input
                      value={tempProduct.travelDate}
                      onChange={handleModalInputChange}
                      name="travelDate"
                      id="travelDate"
                      type="text"
                      className="form-control"
                      placeholder="請輸入行程日期"
                    />
                    {formErrors.travelDate && <div className="text-danger small">{formErrors.travelDate}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="leastPeopleNum" className="form-label">最少成團人數</label>
                    <input
                      value={tempProduct.leastPeopleNum}
                      onChange={handleModalInputChange}
                      name="leastPeopleNum"
                      id="leastPeopleNum"
                      type="number"
                      className="form-control"
                      placeholder="請輸入最少成團人數"
                    />
                    {formErrors.leastPeopleNum && <div className="text-danger small">{formErrors.leastPeopleNum}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label">單位</label>
                    <input
                      value="人"
                      name="unit"
                      id="unit"
                      type="text"
                      className="form-control"
                      disabled  // 禁用輸入
                    />
                  </div>

                  <div className="form-check">
                    <input
                      checked={tempProduct.is_enabled}
                      onChange={handleModalInputChange}
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="isEnabled"
                    />
                    <label className="form-check-label" htmlFor="isEnabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button onClick={handleCloseProductModal} type="button" className="btn btn-secondary">
                取消
              </button>
              <button onClick={handleUpdateProduct} type="button" className="btn btn-primary">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={delProductModalRef}
        className="modal fade"
        id="delProductModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除產品</h1>
              <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除
              <span className="text-danger fw-bold">{tempProduct.title}</span>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseDelProductModal}
                type="button"
                className="btn btn-secondary"
              >
                取消
              </button>
              <button onClick={handleDeleteProduct} type="button" className="btn btn-danger">
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
      {isScreenLoading && (
        <div className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 999,
          }}>
          <ReactLoading type="spokes" color="black" width="4rem" height="4rem" />
        </div>)
      }
    </>
  );
};

export default AdminDashboard;