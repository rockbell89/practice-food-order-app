import { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";

const Checkout = ({ onComfirm, hideOrderHandler }) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isPostalCode = (value) => value.length === 5;

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isPostalCode(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    onComfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  return (
    <Modal hideOrderHandler={hideOrderHandler}>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputValidity.name && (
            <p className="error">올바른 이름을 입력해주세요</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputValidity.street && (
            <p className="error">올바른 주소를 입력해주세요</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formInputValidity.postal && (
            <p className="error">올바른 우편번호 입력해주세요</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputValidity.city && (
            <p className="error">올바른 도시를 입력해주세요</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={hideOrderHandler}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
