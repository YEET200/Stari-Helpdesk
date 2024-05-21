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
} from '../../stores/knowledge_base_articles/knowledge_base_articlesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditKnowledge_base_articles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    content: '',

    category: '',

    author: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { knowledge_base_articles } = useAppSelector(
    (state) => state.knowledge_base_articles,
  );

  const { knowledge_base_articlesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: knowledge_base_articlesId }));
  }, [knowledge_base_articlesId]);

  useEffect(() => {
    if (typeof knowledge_base_articles === 'object') {
      setInitialValues(knowledge_base_articles);
    }
  }, [knowledge_base_articles]);

  useEffect(() => {
    if (typeof knowledge_base_articles === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = knowledge_base_articles[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [knowledge_base_articles]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: knowledge_base_articlesId, data }));
    await router.push('/knowledge_base_articles/knowledge_base_articles-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit knowledge_base_articles')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit knowledge_base_articles'}
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

              <FormField label='Category' labelFor='category'>
                <Field name='Category' id='Category' component='select'>
                  <option value='product_guides'>product_guides</option>

                  <option value='troubleshooting'>troubleshooting</option>

                  <option value='faqs'>faqs</option>

                  <option value='best_practices'>best_practices</option>
                </Field>
              </FormField>

              <FormField label='Author' labelFor='author'>
                <Field
                  name='author'
                  id='author'
                  component={SelectField}
                  options={initialValues.author}
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
                      '/knowledge_base_articles/knowledge_base_articles-list',
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

EditKnowledge_base_articles.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_KNOWLEDGE_BASE_ARTICLES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditKnowledge_base_articles;
