import { Form, Button, Input, Table, Modal } from 'antd'
import { RoomApiService } from '../../services/api.serviceroom'
import { TypeApiService } from '../../services/api.servicert'
import { StatusRoomApiService } from '../../services/api.servicerst'
import {StageApiService} from '../../services/api.servicestage'
import { useEffect, useState } from 'react'

const RoomService = new RoomApiService()
const TypeService=new TypeApiService()
const StatusService=new StatusRoomApiService()
const StageService=new StageApiService()
const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Код этажа',
		dataIndex: 'stage_id',
		key: 'stage_id'
	},
	{
		title: 'Номер',
		dataIndex: 'number',
		key: 'number'
	},
	{
		title: 'Код статуса',
		dataIndex: 'roomstatus_id',
		key: 'roomstatus_id'
	},
	
	{
		title: 'Тип номера',
		dataIndex: 'roomtype_id',
		key: 'roomtype_id'
	}
]

function CrudRoom(props) {
	const [items, setItems] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [itemRecord, setItemRecord] = useState({})

	const [roomTypes, setRoomTypes] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);

	const [roomStatus, setRoomStatus] = useState([]);
    const [selectedRoomStatus, setSelectedRoomStatus] = useState(null);

	const [stages, setStages] = useState([]); // State for stages
	const [selectedStage, setSelectedStage] = useState(null); // State for selected stage

	 function showItem(recId) {
		recId
		  ? RoomService.get('/item/' + recId)
			.then(res => {
			  setItemRecord(res);
			  setModalVisible(true);
			})
		  : setModalVisible(true);
	  }
	
	  function saveItem() {
		RoomService.post('/item', itemRecord)
		  .then(() => {
			close();
			fetchData();
		  })
		  .catch(error => console.error('Error saving room:', error));
	  }
	
	  function removeItem(recId) {
		RoomService.delete('/item/' + recId)
		  .then(() => {
			close();
			fetchData();
		  })
		  .catch(error => console.error('Error deleting room:', error));
	  }
	
	  function close() {
		setItemRecord({});
		setModalVisible(false);
	  }
	
	  function fetchData() {
		RoomService.get('/items')
		  .then(res => {
			setItems(res);
		  })
		  .catch(error => console.error('Error fetching room data:', error));
	  }

	
		 useEffect(() => {
    // Fetch room types
    TypeService.get('/items')
      .then(data => setRoomTypes(data))
      .catch(error => console.error('Error fetching room types:', error));

    // Fetch room statuses
    StatusService.get('/items')
      .then(data => setRoomStatus(data))
      .catch(error => console.error('Error fetching room statuses:', error));

    // Fetch stages
    StageService.get('/items')
      .then(data => setStages(data))
      .catch(error => console.error('Error fetching stages:', error));

    // Fetch initial room data
    fetchData();
  }, []);
   
	
	return (
		<>
				<Button className='ButtonAdd' type='primary' onClick={() => showItem()}>
					Добавить
				</Button>
				<></>
			<Table className='TableItems'
				pagination={{ position: ['topRight'] }}
				dataSource={items}
				columns={columns}
				rowKey='id'
				onRow={rec => {
					return {
						onClick: () => showItem(rec.id)
					}
				}}
			></Table>
			<Modal 
				title={itemRecord.id ? 'Изменение данных о номере с id=' + itemRecord.id : 'Добавление нового номера'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					 
						<Button key="submit"className='ButtonSave' type='primary'  onClick={() => saveItem()} disabled={!itemRecord.stage_id || !itemRecord.number|| !itemRecord.roomstatus_id|| !itemRecord.roomtype_id}>
							Сохранить
						</Button>,
						<Button danger onClick={() => removeItem(itemRecord.id)} disabled={!itemRecord.id}>
							Удалить
						</Button>,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 5}} wrapperCol={{ span: 18 }}>
				<Form.Item label='Номер этажа'>
            <select
              onChange={e => {
                setSelectedStage(e.target.value);
                setItemRecord({ ...itemRecord, stage_id: e.target.value });
              }}
              value={itemRecord.stage_id}
            >
              <option value={null}>Выберите этаж</option>
              {stages.map(stage => (
                <option key={stage.id} value={stage.id}>
                  {stage.number}
                </option>
              ))}
            </select>
          </Form.Item>
					<Form.Item label='Номер' >
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, number: v.target.value }
								})
							}
							value={itemRecord.number}
						/>
					</Form.Item>

					<Form.Item label='Тип номера' >
					<select
              		onChange={e => {
                	setSelectedRoomType(e.target.value);
                	setItemRecord({ ...itemRecord, roomtype_id: e.target.value });
              		}}
					  value={itemRecord.roomtype_id}
           			 >		
             		 <option value={null}>Выберите тип</option>
              		{roomTypes.map(type => (
                		<option key={type.id} value={type.id}>
                 	 {type.name}
                	</option>
              		))}
                     </select>
					</Form.Item>

					<Form.Item label='Статус' >
					<select
             
              onChange={e => {
                setSelectedRoomStatus(e.target.value);
                setItemRecord({ ...itemRecord, roomstatus_id: e.target.value });
              }}
			  value={itemRecord.roomstatus_id}
            >
              <option value={null}>Выберите статус</option>
              {roomStatus.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}


export default CrudRoom