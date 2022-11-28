import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/redux";
import {RootState} from "../../../../store";
import s from './PaymentForm.module.scss'
import PaymentCard from 'react-payment-card-component'
import mark from '../../../../assets/checkmark.svg'
import {API} from "../../../../utils/api";
import {useNavigate} from "react-router-dom";
import {setPayment} from "../../../../store/user/user.slice";

interface ChooseCardFormProps {
    totalPrice: number | undefined
    onClickPaymentChangeFormClose: (() => void) | undefined
    isProfilePage?: boolean
}


const ChooseCardForm: React.FC<ChooseCardFormProps> = ({
                                                           totalPrice,
                                                           onClickPaymentChangeFormClose,
                                                           isProfilePage = false
                                                       }) => {

    const payment = useAppSelector((state: RootState) => state.user.payment);
    const [selectedCardId, setSelectedCardId] = useState<number>(-1)

    const onClickCard = (id: number) => {
        setSelectedCardId(id)
    }

    const navigate = useNavigate()

    const onClickPay = async () => {

        try {
            if (onClickPaymentChangeFormClose) {
                onClickPaymentChangeFormClose()
            }

            navigate('/payment-history')
            const res = await API.postTransaction(selectedCardId)


        } catch (e) {
            console.log(e)
        }
    }
    const dispatch = useAppDispatch()
    const fetchPayment = async () => {
        const res = await API.getPayment();
        dispatch(setPayment(res))

    }

    useEffect(() => {
        fetchPayment()
    }, [])

    return (
        <div className={s.container}>
            {selectedCardId === -1 && <p className={s.title}>Please choose a card</p>}
            {
                payment.map(c => <div className={`${s.wrapperCard} ${selectedCardId === c.id && s.selected}`}
                                      onClick={() => onClickCard(c.id)}>
                    <div className={`${s.card} ${selectedCardId === c.id && s.selected}`}>
                        {selectedCardId === c.id && <img src={mark} alt="mark" width={50} className={s.mark}/>}
                        <PaymentCard
                            type="black"
                            brand={`${c.card_type.toLowerCase()}`}
                            number={`************${c.last_4}`}
                            expiration={`${c.expire_date.split('-').join('/').slice(2, 7)}`}
                            flipped={false}
                            holderName={c.user.username}
                        />
                    </div>
                </div>)

            }
            <div className={s.btnBlock}>
                {
                    isProfilePage ? <button className={s.buttonSave}>Delete</button> :
                        <>
                            {selectedCardId !== -1 && <button className={s.buttonSave} onClick={onClickPay}>
                                Pay ₴{totalPrice}
                            </button>}
                        </>

                }
            </div>
        </div>
    );
};

export default ChooseCardForm;