import { useNavigate } from "react-router-dom"

export default function CartOrderModal({cartOrderModal,closeBackSubmitModal,saveFormData, formData}){
    const navigate = useNavigate();
    const backBtn = (data)=>{
        saveFormData(formData);// 儲存表單資料到 localStorage
        navigate('/cart');
        cartOrderModal.current.hide();
    }
    return(<>
    
        <div className="modal fade cartOrderModal" id="cartOrderModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="btn btn-close position-absolute end-0 p-4 border-0" style={{fontSize:"12px"}}
                    onClick={closeBackSubmitModal}></button>
                    <div className="modal-body p-md-20 py-20 px-5">
                        <p className="mb-15 text-center">資料尚未填寫完畢，是否前往上一步？</p>
                        <div className="d-flex">

                            <button to="/cart"className="btn btn-outline-secondary-200 fs-9 fs-md-7 px-3 w-50 me-3"
                            onClick={backBtn}>
                                是，回上一步
                            </button>

                            <button type="button" className="btn btn-secondary-200 fs-9 fs-md-7 px-3 w-50 ms-3"
                            onClick={closeBackSubmitModal}>
                                否，繼續填寫
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}