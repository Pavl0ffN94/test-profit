import {useState} from 'react';
import {useDeleteOrganizationMutation} from '@/features';
import {Organization, OrganizationsResponse} from '@/types';
import {Button, Popconfirm, Table, message} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useNavigate} from 'react-router-dom';

import {AddOrg} from './AddOrg';

import style from './style.module.scss';
import {EditOrganizationModal} from './EditOrganizationsModal';

interface OrgListProps {
  organizationsData: OrganizationsResponse | undefined;
}

export const OrganizationList = ({organizationsData}: OrgListProps) => {
  const navigate = useNavigate();

  const [deleteOrganization] = useDeleteOrganizationMutation();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(
    null,
  );

  const handleDelete = async (orgId: string) => {
    try {
      await deleteOrganization(orgId).unwrap();
      message.success('Компания успешно удалена');
    } catch (error) {
      message.error('Ошибка при удалении компании');
      console.error(error);
    }
  };

  const handleEditClick = (organization: Organization) => {
    setSelectedOrganization(organization);
    setIsEditModalVisible(true);
  };

  const columns: ColumnsType<Organization> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      onCell: record => ({
        onClick: () => navigate(`/organizations/${record.id}/employees`),
      }),
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
      onCell: record => ({
        onClick: () => navigate(`/organizations/${record.id}/employees`),
      }),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      onCell: record => ({
        onClick: () => navigate(`/organizations/${record.id}/employees`),
      }),
    },
    {
      title: 'Число сотрудников',
      dataIndex: 'employees',
      key: 'employees',
      render: employees => employees.length,
      onCell: record => ({
        onClick: () => navigate(`/organizations/${record.id}/employees`),
      }),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: organization => (
        <div className={style.btnActions}>
          <Button
            onClick={e => {
              e.stopPropagation();
              handleEditClick(organization);
            }}>
            Изменить
          </Button>
          <Popconfirm
            title='Вы уверены, что хотите удалить эту компанию?'
            onConfirm={e => {
              if (e) {
                e.stopPropagation();
              }
              handleDelete(organization.id);
            }}
            okText='Да'
            cancelText='Нет'>
            <Button danger>Удалить</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={style.orgWrapper}>
      <div className={style.addOrg}>
        <AddOrg />
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(organizationsData) ? organizationsData : []}
        rowKey='id'
        pagination={false}
        bordered
        onRow={() => ({
          onClick: e => {
            e.stopPropagation();
          },
        })}
      />
      <EditOrganizationModal
        currentOrg={selectedOrganization?.id || ''}
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        organization={selectedOrganization}
      />
    </div>
  );
};
