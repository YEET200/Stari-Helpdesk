import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/support_tickets/support_ticketsSlice';
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

const Support_ticketsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { support_tickets } = useAppSelector((state) => state.support_tickets);

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
        <title>{getPageTitle('View support_tickets')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View support_tickets')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{support_tickets?.title}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {support_tickets.description ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: support_tickets.description,
                }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Status</p>
            <p>{support_tickets?.status ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Customer</p>

            <p>{support_tickets?.customer?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AssignedAgent</p>

            <p>{support_tickets?.assigned_agent?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Attachments</p>
            {support_tickets?.Attachments?.length ? (
              dataFormatter
                .filesFormatter(support_tickets.Attachments)
                .map((link) => (
                  <button
                    key={link.publicUrl}
                    onClick={(e) => saveFile(e, link.publicUrl, link.name)}
                  >
                    {link.name}
                  </button>
                ))
            ) : (
              <p>No Attachments</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Comments</p>
            {support_tickets.comments ? (
              <p
                dangerouslySetInnerHTML={{ __html: support_tickets.comments }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/support_tickets/support_tickets-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Support_ticketsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SUPPORT_TICKETS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Support_ticketsView;
