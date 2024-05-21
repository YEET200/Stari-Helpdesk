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

import { update, fetch } from '../../stores/downloads/downloadsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDownloads = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    file: [],

    category: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { downloads } = useAppSelector((state) => state.downloads);

  const { downloadsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: downloadsId }));
  }, [downloadsId]);

  useEffect(() => {
    if (typeof downloads === 'object') {
      setInitialValues(downloads);
    }
  }, [downloads]);

  useEffect(() => {
    if (typeof downloads === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = downloads[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [downloads]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: downloadsId, data }));
    await router.push('/downloads/downloads-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit downloads')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit downloads'}
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

              <FormField>
                <Field
                  label='File'
                  color='info'
                  icon={mdiUpload}
                  path={'downloads/file'}
                  name='file'
                  id='file'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormFilePicker}
                ></Field>
              </FormField>

              <FormField label='Category' labelFor='category'>
                <Field name='Category' id='Category' component='select'>
                  <option value='software_updates'>software_updates</option>

                  <option value='drivers'>drivers</option>

                  <option value='templates'>templates</option>

                  <option value='mobile_apps'>mobile_apps</option>
                </Field>
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
                  onClick={() => router.push('/downloads/downloads-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditDownloads.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DOWNLOADS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDownloads;
