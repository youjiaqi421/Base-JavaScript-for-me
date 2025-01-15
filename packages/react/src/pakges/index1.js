export default function (props) {
	const {isClose} = props
	const data1 = {name: 'youjiaqi'}
	const data2 = {name: 'youi'}
	const name = isClose ? data1.name : data2.name
	console.log(isClose)
	return (
		<div>
			<div>{name}</div>
		</div>
	)
}
