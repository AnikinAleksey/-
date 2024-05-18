import { Form, Button, Input, Table, Modal } from 'antd'
import { TypeApiService } from '../../services/api.servicert'
import { useEffect, useState } from 'react'

const apiService = new TypeApiService()

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Название типа номера',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Кол-во проживающих',
		dataIndex: 'residents',
		key: 'residents'
	}
]

function CrudBookingStatus(props) {


	const [items, setItems] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	const [itemRecord, setItemRecord] = useState({})

	function showItem(recId) {
		recId
			? apiService.get('/item/' + recId).then(res => {
					setItemRecord(res)
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}

	function saveItem() {
		apiService.post('/item', itemRecord).then(() => {
			close()
			fetchData()
		})
	}

	function removeItem(recId) {
		apiService.delete('/item/' + recId).then(() => {
			close()
			fetchData()
		})
	}

	function close() {
		setItemRecord({})
		setModalVisible(false)
	}

	function fetchData() {
		apiService.get('/items').then(res => {
			setItems(res)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])
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
				title={itemRecord.id ? 'Изменениетипа номера с id=' + itemRecord.id : 'Добавление новго типа номера'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					 
						<Button className='ButtonSave' type='primary' onClick={() => saveItem()} disabled={!itemRecord.name || !itemRecord.residents}>
							Сохранить
						</Button>,
					
					 
						<Button danger onClick={() => removeItem(itemRecord.id)}disabled={!itemRecord.id}>
							Удалить
						</Button>,
					  
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название типа номера'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, name: v.target.value }
								})
							}
							value={itemRecord.name}
						/>
					</Form.Item>
					<Form.Item label='кол-во проживающих'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, residents: v.target.value }
								})
							}
							value={itemRecord.residents}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default CrudBookingStatus