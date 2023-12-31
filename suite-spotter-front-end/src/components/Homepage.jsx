import InputForm from './InputForm';
import AccordionSection from './AccordionSection';
import Location from './Location';

export default function Homepage({ formData, updateFormData, setTrip, resetData, tripData }) {

  return (
    <>
      <Location
        formData={formData}
        updateFormData={updateFormData}
      />
      <InputForm
        formData={formData}
        updateFormData={updateFormData}
      />
      <AccordionSection
        formData={formData}
        updateFormData={updateFormData}
        tripData={tripData}
        setTrip={setTrip}
        resetData={resetData}
      />
    </>
  );

}