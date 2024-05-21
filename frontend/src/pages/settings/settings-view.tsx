import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/settings/settingsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const SettingsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.settings);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View settings')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View settings')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Database User</p>
            <p>{settings?.Database_user}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Database Password</p>
            <p>{settings?.Database_Password}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Database Port</p>
            <p>{settings?.Database_Port}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Databose Host</p>
            <p>{settings?.Databose_Host}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/settings/settings-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

SettingsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SETTINGS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default SettingsView;
