// libs
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";

// components
import InputField from "../form/form-element-wrapper.component";
import Loader from "../loader/loader.component";
import { select, optionsItem, text } from '../form/form-elements.component';

// utils
import { fetchDndData } from "../../utils/firebaseFetch";
import {
  VALIDATION_SCHEMA,
  FIELDS_MAP,
  initValues,
  generateLevelIncrements,
} from "./character-profile-form.utils";

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

  const pcData = user.pc && Object.keys(user.pc).length !== 0 ? user.pc : false;
  const formik = useFormik({
    initialValues: initValues(pcData),
    initialTouched: false,
    validationSchema: Yup.object(VALIDATION_SCHEMA),
    onSubmit: async (values) => {
      const response = await updatePlayerCharacterProfile(user, values);
      toastr[response.status](response.message);
    },
  });

  const optionsBuilder = elementId => {
    switch (elementId) {
      case "level":
        return generateLevelIncrements().map(level => {
          return optionsItem(level);
        });
      case "race":
        return dndData.race.sort().map(race => {
          return optionsItem(race);
        });
      case "class":
        return dndData.class.map(charClass => {
          return optionsItem(charClass);
        });
      case "subClass":
        return dndData.subClass[formik.values.charClass.toLowerCase()]
          .sort()
          .map(subClass => {
            return optionsItem(subClass);
          });
    }
  };

  if (typeof dndData === "undefined" || dndData.length === 0) return <Loader />;

  return (
    <div className="sign-up eight wide column">
      <h2>Basic character details</h2>
      <form className="ui form" onSubmit={formik.handleSubmit}>
        {FIELDS_MAP.map(element => {
          if (element.id === 'subClass' && formik.values.charClass === "") {
            return null;
          }

          return (
            <InputField
              key={element.id}
              label={element.label}
              name={element.id}
              formik={formik}
            >              
              {element.type === "text" ? text(element, formik) : null}
              {element.type === "select" ? select(element, formik, optionsBuilder(element.id)) : null}
            </InputField>
          );
        })}
        <div className="ui divider"></div>
        <button type="submit" className="ui button teal">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CharacterProfileForm;
