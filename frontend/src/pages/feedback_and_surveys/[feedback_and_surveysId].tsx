import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/feedback_and_surveys/feedback_and_surveysSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditFeedback_and_surveys = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    content: '',

    type: '',

    customer: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { feedback_and_surveys } = useAppSelector(
    (state) => state.feedback_and_surveys,
  );

  const { feedback_and_surveysId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: feedback_and_surveysId }));
  }, [feedback_and_surveysId]);

  useEffect(() => {
    if (typeof feedback_and_surveys === 'object') {
      setInitialValues(feedback_and_surveys);
    }
  }, [feedback_and_surveys]);

  useEffect(() => {
    if (typeof feedback_and_surveys === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = feedback_and_surveys[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [feedback_and_surveys]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: feedback_and_surveysId, data }));
    await router.push('/feedback_and_surveys/feedback_and_surveys-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit feedback_and_surveys')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit feedback_and_surveys'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Content' hasTextareaHeight>
                <Field
                  name='content'
                  id='content'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='Type' id='Type' component='select'>
                  <option value='customer_feedback'>customer_feedback</option>

                  <option value='surveys'>surveys</option>
                </Field>
              </FormField>

              <FormField label='Customer' labelFor='customer'>
                <Field
                  name='customer'
                  id='customer'
                  component={SelectField}
                  options={initialValues.customer}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/feedback_and_surveys/feedback_and_surveys-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditFeedback_and_surveys.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_FEEDBACK_AND_SURVEYS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditFeedback_and_surveys;
