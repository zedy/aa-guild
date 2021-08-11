// libs
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import InputField from "../form/input/input.component";
import Loader from "../loader/loader.component";

// utils
import { fetchDndData } from "../../utils/firebaseFetch";

// firebase
import { updatePlayerCharacterProfile } from "../../firebase/firebase.utils";

const CharacterProfileForm = ({ user }) => {
  const [dndData, setDndData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchDndData();
      setDndData(data);
    })();
  }, []);

  const pcData = Object.keys(user.pc).length !== 0 ? user.pc : false;

  const initialValues = {
    charClass: pcData ? pcData.charClass : "",
    subClass: pcData ? pcData.subClass : "",
    race: pcData ? pcData.race : "",
    level: pcData ? pcData.level : "",
    name: pcData ? pcData.name : ""
  };

  // TODO export validation schema to separate file

  const formik = useFormik({
    initialValues: initialValues,
    initialTouched: false,
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(30).required("Required"),
      charClass: Yup.string().min(1).required("Required"),
      level: Yup.string().min(1).required("Required"),
      subClass: Yup.string().min(1).required("Required"),
      race: Yup.string().min(1).required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await updatePlayerCharacterProfile(user, values);
        alert('eyey');
      } catch (err) {
        console.log(err); // TODO toastr message
      }
    },
  });

  const generateLevelIncrements = () => {
    let levels = [];

    for (let i = 1; i < 21; i++) {
      levels.push(i);
    }

    return levels;
  };

  if (typeof dndData === "undefined" || dndData.length === 0) return <Loader />;

  return (
    <div className="sign-up eight wide column">
      <h2>Basic character details</h2>
      <form className="ui form" onSubmit={formik.handleSubmit}>
        <InputField label="Name" name="name" formik={formik}>
          <input
            type="text"
            id="name"
            placeholder="Character name"
            {...formik.getFieldProps("name")}
          />
        </InputField>
        <InputField label="Level" name="level" formik={formik}>
          <select id="level" {...formik.getFieldProps("level")}>
            <option value="" disabled>
              Choose level
            </option>
            {generateLevelIncrements().map((level) => {
              return (
                <option value={level} key={level}>
                  {level}
                </option>
              );
            })}
          </select>
        </InputField>
        <InputField label="Race" name="race" formik={formik}>
          <select id="race" {...formik.getFieldProps("race")}>
            <option value="" disabled>
              Choose race
            </option>
            {dndData.race.sort().map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </InputField>
        <InputField label="Class" name="charClass" formik={formik}>
          <select id="charClass" {...formik.getFieldProps("charClass")}>
            <option value="" disabled>
              Choose class
            </option>
            {dndData.class.map((charClass) => {
              return (
                <option value={charClass} key={charClass}>
                  {charClass}
                </option>
              );
            })}
          </select>
        </InputField>
        {formik.values.charClass !== "" ? (
          <InputField label="Sub class" name="subClass" formik={formik}>
            <select id="subClass" {...formik.getFieldProps("subClass")}>
              <option value="" disabled>
                Choose sub-class
              </option>
              {dndData.subClass[formik.values.charClass.toLowerCase()].sort().map((subClass) => {
                return (
                  <option value={subClass} key={subClass}>
                    {subClass}
                  </option>
                );
              })}
            </select>
          </InputField>
        ) : null}
        <div className="ui divider"></div>
        <button type="submit" className="ui button teal">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CharacterProfileForm;
