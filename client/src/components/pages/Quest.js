import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../../services/api.servicequest'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Фамилия',
		dataIndex: 'surname',
		key: 'surname'
	},
	{
		title: 'Имя',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Отчество',
		dataIndex: 'fathername',
		key: 'fathername'
	},
	{
		title: 'Серия',
		dataIndex: 'series',
		key: 'series'
	},
	{
		title: 'Номер',
		dataIndex: 'number',
		key: 'number'
	},
	{
		title: 'Телефон',
		dataIndex: 'phone',
		key: 'phone'
	},
]

function CrudQuest(props) {


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
				title={itemRecord.id ? 'Изменение данных о госте с id=' + itemRecord.id : 'Добавление нового гостя'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					 
						<Button className='ButtonSave' type='primary'  onClick={() => saveItem()} disabled={!itemRecord.surname || !itemRecord.name|| !itemRecord.fathername|| !itemRecord.series|| !itemRecord.number|| !itemRecord.phone}>
							Сохранить
						</Button>,
						<Button danger onClick={() => removeItem(itemRecord.id)}disabled={!itemRecord.id}>
							Удалить
						</Button>,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4}} wrapperCol={{ span: 18 }}>
					<Form.Item label='Фамилия'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, surname: v.target.value }
								})
							}
							value={itemRecord.surname}
						/>
					</Form.Item>
					<Form.Item label='Имя'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, name: v.target.value }
								})
							}
							value={itemRecord.name}
						/>
					</Form.Item>
					<Form.Item label='Отчество'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, fathername: v.target.value }
								})
							}
							value={itemRecord.fathername}
						/>
					</Form.Item>
					<Form.Item label='Серия'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, series: v.target.value }
								})
							}
							value={itemRecord.series}
						/>
					</Form.Item>
					<Form.Item label='Номер'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, number: v.target.value }
								})
							}
							value={itemRecord.number}
						/>
					</Form.Item>
					<Form.Item label='Телефон'>
						<Input
							onChange={v =>
								setItemRecord(prevState => {
									return { ...prevState, phone: v.target.value }
								})
							}
							value={itemRecord.phone}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default CrudQuest