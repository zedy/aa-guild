// libs
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";
import DatePicker from "react-datepicker";

// styles
import "react-datepicker/dist/react-datepicker.css";

// components
import InputField from "../form/input/input.component";
import ImageUpload from "../image-upload/image-upload.component";
import { FormField } from "semantic-ui-react";

const EventForm = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    headline: "",
    location: "",
    season: "",
    session: "",
    text: "",
    date: "",
    latitude: "",
    longitude: "",
    image: "",
    heroImage: "",
  };

  const formElementsMapLeft = [
    { type: "image", id: "heroImage", label: "Hero image", placeholder: 'Event hero image' },
    { type: "image", id: "image", label: "Body image", placeholder: 'Event image' },
  ];

  const formElementsMapRight = [
    { type: "text", id: "headline", label: "Headline" },
    { type: "text", id: "location", label: "Location" },
    { type: "select", id: "season", label: "Season", limit: "6" },
    { type: "select", id: "session", label: "Session", limit: "16" },
    { type: "textarea", id: "text", label: "Text" },
    { type: "text", id: "date", label: "Choose date" },
    { type: "text", id: "latitude", label: "Latitude" },
    { type: "text", id: "longitude", label: "Longitude" },
  ];

  // TODO export validation schema to separate file

  const formik = useFormik({
    initialValues: initialValues,
    initialTouched: false,
    validationSchema: Yup.object({
      headline: Yup.string().min(10).max(50).required("Required"),
      location: Yup.string().min(4).max(25).required("Required"),
      season: Yup.number().positive().integer().required("Required"),
      session: Yup.number().positive().integer().required("Required"),
      text: Yup.string().min(50).max(2000).required("Required"),
      date: Yup.string().min(8).max(25).required("Required"),
      latitude: Yup.number().required("Required"),
      longitude: Yup.number().required("Required"),
      image: Yup.string().required("Required"),
      heroImage: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      // const data = gedChangedValues(values);
      // const response = await updateUserProfile(user, data);
      // toastr[response.status](response.message);
      // setLoading(false);
    },
  });

  const textarea = (element, formik) => (
    <textarea
      type={element.type}
      id={element.id}
      placeholder={element.label}
      {...formik.getFieldProps(element.id)}
    />
  );

  const datePicker = (
    <DatePicker
      id="date"
      name="date"
      selected={startDate}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      onChange={(date) => setStartDate(date)}
    />
  );

  const image = (element, callback, formik) => {
    return (
      <ImageUpload
        fileName={element.id}
        path="events"
        presetImage={null}
        callback={callback}
        defaultImage={`https://via.placeholder.com/300x300.png?text=${element.placeholder}`}
      >
        <input type="hidden" id={element.id}  {...formik.getFieldProps(element.id)} />
      </ImageUpload>
    );
  };

  const input = (element, formik) => {
    if (element.id === "date") {
      return datePicker;
    }

    return (
      <input
        type={element.type}
        id={element.id}
        placeholder={element.label}
        {...formik.getFieldProps(element.id)}
      />
    );
  };

  const select = (element, formik) => (
    <select id={element.id} {...formik.getFieldProps(element.id)}>
      <option value="" disabled>
        Choose an option
      </option>
      {generateSelectOptions(element.limit).map((level) => {
        return (
          <option value={level} key={element.id + "-" + level}>
            {level}
          </option>
        );
      })}
    </select>
  );

  const generateSelectOptions = (limit) => {
    let options = [];

    for (let i = 1; i < limit; i++) {
      options.push(i);
    }

    return options;
  };

  const imageCallback = () => {
    console.log("a");
  };

  return (
    <>
      <h1>{!event ? "Event create" : "Edit event"}</h1>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        <div className="ui grid">
          <div className="four wide column">
          {formElementsMapLeft.map(element => {
              return (
                <InputField
                  key={element.id}
                  label={element.label}
                  name={element.id}
                  formik={formik}
                >
                  {element.type === "image" ? image(element, imageCallback, formik) : null}
                </InputField>
              );
            })}                    
          </div>
          <div className="twelve wide column">
            {formElementsMapRight.map(element => {
              return (
                <InputField
                  key={element.id}
                  label={element.label}
                  name={element.id}
                  formik={formik}
                >
                  {element.type === "textarea"
                    ? textarea(element, formik)
                    : null}
                  {element.type === "select" ? select(element, formik) : null}
                  {element.type === "text" ? input(element, formik) : null}
                </InputField>
              );
            })}
          </div>
        </div>
        <div className="ui divider"></div>
        <button type="submit" className="ui button teal">
          Submit
        </button>
      </form>
    </>
  );
};

export default EventForm;
