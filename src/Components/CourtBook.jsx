
import "./Css/CourtBook.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../Config/AxiosInstance";
import { BASE_URL, TIMINGS } from "../Constants/Constants";
import ModalView from "./Common/Modal";
import { toastError, toastSuccess } from "../Constants/plugins";
import { useSelector } from "react-redux";


function CourtBook() {
    const { id } = useParams()
    const [singleCourtData, setSingleCourtData] = useState({})
    const [modalOpen, setModalOpen] = useState()
    const [timeSlotData, setTimeSlotData] = useState({ startDate: '', endDate: '', cost: null });
    const [showDropDown, setShowDropDown] = useState(false)
    const [selectedTimings, setSelectedTimings] = useState([])
    const [filterTimings, setFilterTimings] = useState(TIMINGS)
    const [slotData, setSlotData] = useState([]);
    const [inputDate, setInputDate] = useState()
    const [bookingModal, setBookingModal] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const { userDetails } = useSelector(state => state.user) //taking user details 
    const [editCourtModal, setCourtEditModal] = useState(false)
    const [editCourtData, setEditCourtData] = useState({})
    useEffect(() => {
        getSinglecourtData()
        getTimeSlotData(new Date())
    }, []);
    useEffect(() => {
        getLatestFilterSlots()
    }, [selectedTimings]);

    const getSinglecourtData = () => {
        AxiosInstance.get('/users/getSinglecourtData', { params: { courtId: id } }).then((res) => {
            setSingleCourtData(res.data)
            setEditCourtData(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    };
    const handleChange = (e) => {
        setTimeSlotData({ ...timeSlotData, [e.target.name]: e.target.value });
    }
    const getLatestFilterSlots = () => {
        if (selectedTimings.length === 0) {
            setFilterTimings(TIMINGS);
        } else {
            const tempArray = []
            for (let slot of TIMINGS) {
                let flag = false
                for (let Sslot of selectedTimings) {
                    if (slot.id === Sslot.id) {
                        flag = true;
                    }
                }
                if (!flag) {
                    tempArray.push(slot)
                }
            }
            setFilterTimings(tempArray) //setting temperory array
        }
    }
    const handleCreateTimeslot = () => {
        try {
            AxiosInstance.post('/admin/addTimeSlotData', { ...timeSlotData, selectedTimings, courtId: id }).then((res) => {
                setModalOpen(false)
                toastSuccess('court slots added')

            })
                .catch(() => {
                    toastError("something went wrong")
                })
        } catch (err) {
            toastError('something went wrong')
        }
    }
    const getTimeSlotData = (date = new Date()) => {
        AxiosInstance.get('/users/dayWiseTimeSlot', { params: { courtId: id, date: date } }).then((res) => {
            setSlotData(res.data)  
        })
        // .catch{(err)=>{
        //  debugger
        // }}
    }
    const handleCourtDataChg=(e)=>{
        setEditCourtData({...editCourtData,[e.target.name]:e.target.value})
    }

    //razor pay 

    const initiateBooking = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // creating a new order
        const result = await AxiosInstance.post("/payment/orders", { slotId: selectedSlot._id });
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: "rzp_test_GOCTk0BUMl51is", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Court booking",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    slotId: selectedSlot._id
                };
                const result = await AxiosInstance.post("/payment/success", data);


                toastSuccess(result.data.msg);
                setBookingModal(false)
                getTimeSlotData(new Date(inputDate))


            },
            prefill: {
                name: "Court booking",
                email: "bookyourcourt@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "my court",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
const updateEditedCD=()=>{
    AxiosInstance.post('/admin/updateEditedCD',editCourtData).then((res)=>{
setCourtEditModal(false)
//setSingleCourtData(editCourtData) //this will not work when it is an image
getSinglecourtData()
    })
    .catch((err)=>{

    })
}
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    //scrolling text
    return (
        <>
            <div className="single-court-img-box">
                <img
                    src={`${BASE_URL}/courts/${singleCourtData?.courtPicture}`}
                    alt="" />
                <div className="court-name">
                    <h3>{singleCourtData.courtName}</h3>

                    <span>
                        {userDetails.role === 1 && <button onClick={() => setModalOpen(true)}>add Time slot</button>}

                        {userDetails.role === 1 && <button className="btn btn-black text-light border rounded-2" onClick={() => setCourtEditModal(true)}>Edit Court</button>}

                    </span>
                </div>
            </div>
            <div className="d-flex">
                <marquee
                    behavior='scroll'
                    direction='right'
                    className="rolling-booking"
                >
                    <h3 className="d-inline">Confirm your slot at the earliest</h3>
                </marquee>
            </div>

            {/*// book now box under scrolling text*/}

            <div className="container-fluid mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4 col-12 border border-1 rounded-2">
                        <div className="date-picker">
                            <span>Today</span>
                            <span>Tomorrow</span>
                            <div>
                                <input type="date" placeholder="select a specific date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} />
                                <button onClick={() => inputDate && getTimeSlotData(new Date(inputDate))}>Search</button>

                            </div>

                        </div>
                        <div className="slotname-container d-flex flex-wrap gx-2 gap-3 mt-5 pointer">

                            {slotData.map((slot) => <span className={`border rounded-2 ${slot.bookedBy ? 'bg-success' : 'bg-warning'}`} key={slot.id} onClick={() => { setBookingModal(true); setSelectedSlot(slot) }}> {slot.slot.name} </span>)}

                        </div>
                        <button className="btn btn-primary w-100 mt-5 border ">
                            {" "}
                            Book Now{" "}
                        </button>
                    </div>
                </div>
            </div>

            {/* //admin modal in add time slot */}

            <ModalView modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <div className=" d-flex flex-column add-court-timing-modal ">
                    <h3>{singleCourtData.courtName}</h3>
                    <h5>{singleCourtData.location}</h5>
                    <label htmlFor="">Starting date</label>
                    <input type="date"
                        min={timeSlotData.endDate}   //to be fetched from backend
                        value={timeSlotData.startDate}
                        name='startDate'
                        onChange={handleChange} />
                    <label htmlFor="">Ending date</label>
                    <input type="date"
                        min={timeSlotData.startDate}
                        value={timeSlotData.endDate}
                        name='endDate'
                        onChange={handleChange} />
                    <label htmlFor="">Cost</label>
                    <input type="number"
                        value={timeSlotData.cost}
                        name='cost'
                        onChange={handleChange} />
                    <div className="cus-dropdown mt-4 d-inline bg-success" onClick={() => setShowDropDown(true)}>Select Timings
                        {showDropDown && (
                            <div className="cus-options"
                                onMouseLeave={() => setShowDropDown(false)}>
                                <ul>
                                    {filterTimings.map((element, index) => (
                                        <li onClick={() => setSelectedTimings([...selectedTimings, element])}
                                            style={{ cursor: 'pointer' }}>{element.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                    <div className="m-2">
                        {selectedTimings?.length > 0 ? (selectedTimings.map((element) => (
                            <span className="border border-1 bg-warning border rounded-2 border-dark p-1" >
                                {element.name}
                            </span>
                        ))
                        ) : (
                            <i>no slots available</i>
                        )}
                    </div>
                </div>
                <button className="btn-primary w-100 mt-3 bg-primary border rounded-2" onClick={handleCreateTimeslot}>
                    {" "}
                    Submit
                </button>
            </ModalView>

            {/*//modal open while clicking book now/each time in the slot*/}

            <ModalView modalOpen={bookingModal} setModalOpen={setBookingModal}>
                <div>court name: {selectedSlot?.court?.courtName}</div>
                <div>date: {new Date(selectedSlot?.date).toString().slice(0, 15)}</div>
                <div>slot:{selectedSlot?.slot?.name}</div>
                <div>cost:{selectedSlot?.cost}</div>
                <div>address:{selectedSlot?.court?.address}</div>
                <button onClick={initiateBooking}>Book now</button>
            </ModalView>

            <ModalView modalOpen={editCourtModal} setModalOpen={setCourtEditModal}>
                <h3>Edit court Data</h3>
                <label>court name </label>
                <input type="text" name="courtName"  value={editCourtData?.courtName} onChange={handleCourtDataChg}/><br/>
               
                <label htmlFor="">location</label>
                <input type="text" name="location" value={editCourtData?.location} onChange={handleCourtDataChg}/><br/>
               
                <label htmlFor="">Address</label>
                <input type="text"name="address" value={editCourtData?.address} onChange={handleCourtDataChg} /><br/>
                
                <label htmlFor="">type</label>
                <input type="text" name="type" value={editCourtData?.type} onChange={handleCourtDataChg}/><br/>
               
                <button onClick={updateEditedCD}>Save</button>
                
            </ModalView>
        </>
    )
}
export default CourtBook