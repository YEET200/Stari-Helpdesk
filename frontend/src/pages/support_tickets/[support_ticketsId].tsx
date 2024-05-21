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
} from '../../stores/support_tickets/support_ticketsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditSupport_tickets = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    description: '',

    status: '',

    customer: '',

    assigned_agent: '',

    Attachments: [],

    comments: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { support_tickets } = useAppSelector((state) => state.support_tickets);

  const { support_ticketsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: support_ticketsId }));
  }, [support_ticketsId]);

  useEffect(() => {
    if (typeof support_tickets === 'object') {
      setInitialValues(support_tickets);
    }
  }, [support_tickets]);

  useEffect(() => {
    if (typeof support_tickets === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = support_tickets[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [support_tickets]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: support_ticketsId, data }));
    await router.push('/support_tickets/support_tickets-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit support_tickets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit support_tickets'}
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

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  id='description'
                  component={RichTextField}
                ></Field>
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
                  <option value='open'>open</option>

                  <option value='in_progress'>in_progress</option>

                  <option value='resolved'>resolved</option>

                  <option value='closed'>closed</option>
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

              <FormField label='AssignedAgent' labelFor='assigned_agent'>
                <Field
                  name='assigned_agent'
                  id='assigned_agent'
                  component={SelectField}
                  options={initialValues.assigned_agent}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField>
                <Field
                  label='Attachments'
                  color='info'
                  icon={mdiUpload}
                  path={'support_tickets/Attachments'}
                  name='Attachments'
                  id='Attachments'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormFilePicker}
                ></Field>
              </FormField>

              <FormField label='Comments' hasTextareaHeight>
                <Field
                  name='comments'
                  id='comments'
                  component={RichTextField}
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
                    router.push('/support_tickets/support_tickets-list')
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

EditSupport_tickets.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SUPPORT_TICKETS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSupport_tickets;
