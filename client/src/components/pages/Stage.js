import { Form, Button, Input, Table, Modal } from 'antd'
import { StageApiService } from '../../services/api.servicestage'
import { useEffect, useState } from 'react'

const apiService = new StageApiService()

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Название этажа',
		dataIndex: 'number',
		key: 'number'
	},
]

function CrudStage(props) {


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
				<Button   className='ButtonAdd' type='primary' onClick={() => showItem()}>
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
				title={itemRecord.id ? 'Изменение этажа с id=' + itemRecord.id : 'Добавление нового этажа'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					 
						<Button className='ButtonSave'type='primary'  onClick={() => saveItem()} disabled={!itemRecord.number}>
							Сохранить
						</Button>,
					
					 
						<Button  danger onClick={() => removeItem(itemRecord.id)}disabled={!itemRecord.id}>
							Удалить
						</Button>,
					  
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Номер этажа'>
						<Input  
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, number: v.target.value }
								})
							}
							value={itemRecord.number}
						/>
					</Form.Item >
				</Form>
			</Modal>
		</>
	)
}

export default CrudStage