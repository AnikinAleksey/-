import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../../services/api.servicerst'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Название статуса номера',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Описание',
		dataIndex: 'comment',
		key: 'comment'
	}
]

function CrudRoomStatus(props) {


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
			 
				<Button type='primary' onClick={() => showItem()}>
					Добавить
				</Button>
			
				<></>
			
			<Table
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
				title={itemRecord.id ? 'Изменение сущности с id=' + itemRecord.id : 'Добавление новой сущности'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					 
						<Button type='primary' onClick={() => saveItem()} disabled={!itemRecord.name || !itemRecord.comment}>
							Сохранить
						</Button>,
					
					 
						<Button danger onClick={() => removeItem(itemRecord.id)}>
							Удалить
						</Button>,
					  
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название статуса'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, name: v.target.value }
								})
							}
							value={itemRecord.name}
						/>
					</Form.Item>
					<Form.Item label='Описание статуса'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, comment: v.target.value }
								})
							}
							value={itemRecord.comment}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default CrudRoomStatus