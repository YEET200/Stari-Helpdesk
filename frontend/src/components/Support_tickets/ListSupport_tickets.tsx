import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  support_tickets: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListSupport_tickets = ({
  support_tickets,
  loading,
  onEdit,
  onView,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(
    currentUser,
    'UPDATE_SUPPORT_TICKETS',
  );

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          support_tickets.map((item) => (
            <CardBox hasTable key={item.id} className={'rounded'}>
              <div className={'flex items-center overflow-hidden'}>
                <div
                  className={
                    'flex-1 px-4 py-6 h-24 flex items-stretch divide-x-2 dark:divide-dark-700 overflow-x-auto'
                  }
                  onClick={() => onView(item.id)}
                >
                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Title</p>
                    <p className={'line-clamp-2'}>{item.title}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Description</p>
                    <p className={'line-clamp-2'}>{item.description}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Status</p>
                    <p className={'line-clamp-2'}>{item.status}</p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Customer</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.usersOneListFormatter(item.customer)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>AssignedAgent</p>
                    <p className={'line-clamp-2'}>
                      {dataFormatter.usersOneListFormatter(item.assigned_agent)}
                    </p>
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Attachments</p>
                    {dataFormatter
                      .filesFormatter(item.Attachments)
                      .map((link) => (
                        <button
                          key={link.publicUrl}
                          onClick={(e) =>
                            saveFile(e, link.publicUrl, link.name)
                          }
                        >
                          {link.name}
                        </button>
                      ))}
                  </div>

                  <div className={'flex-1 px-3'}>
                    <p className={'text-xs text-gray-500'}>Comments</p>
                    <p className={'line-clamp-2'}>{item.comments}</p>
                  </div>
                </div>
                <ListActionsPopover
                  onDelete={onDelete}
                  onView={onView}
                  onEdit={onEdit}
                  itemId={item.id}
                  hasUpdatePermission={hasUpdatePermission}
                />
              </div>
            </CardBox>
          ))}
        {!loading && support_tickets.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListSupport_tickets;