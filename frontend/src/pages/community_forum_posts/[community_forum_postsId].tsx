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
} from '../../stores/community_forum_posts/community_forum_postsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCommunity_forum_posts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    content: '',

    author: '',

    moderator: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { community_forum_posts } = useAppSelector(
    (state) => state.community_forum_posts,
  );

  const { community_forum_postsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: community_forum_postsId }));
  }, [community_forum_postsId]);

  useEffect(() => {
    if (typeof community_forum_posts === 'object') {
      setInitialValues(community_forum_posts);
    }
  }, [community_forum_posts]);

  useEffect(() => {
    if (typeof community_forum_posts === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = community_forum_posts[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [community_forum_posts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: community_forum_postsId, data }));
    await router.push('/community_forum_posts/community_forum_posts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit community_forum_posts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit community_forum_posts'}
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

              <FormField label='Moderator' labelFor='moderator'>
                <Field
                  name='moderator'
                  id='moderator'
                  component={SelectField}
                  options={initialValues.moderator}
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
                      '/community_forum_posts/community_forum_posts-list',
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

EditCommunity_forum_posts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_COMMUNITY_FORUM_POSTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCommunity_forum_posts;
