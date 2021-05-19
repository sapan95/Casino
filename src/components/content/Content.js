import classes from "./Content.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/store";
import { useState } from "react";

const sortData = (games, ascending, value) => {
	return games.sort((gm1, gm2) => {
		if(value === 'id'){
			if (ascending) {
				return gm1.id > gm2.id ? 1 : -1;
			  } else {
				return gm1.id < gm2.id ? 1 : -1;
			  }
		}else{
		if (ascending) {
				return new Date(gm1.time).getTime() > new Date(gm2.time).getTime() ? 1 : -1;
	  		} else {
				return new Date(gm1.time).getTime() < new Date(gm2.time).getTime() ? 1 : -1;
	  		}
		}
	});
  };

const Content = () => {
	let games = useSelector((state) => state.user.games);
	const [sorting, setSorting] = useState({isAscending: false, value: 'id'});
	const xyz = [...games];
	sortData(xyz, !sorting.isAscending, sorting.value);
	games = [...xyz];
	// if (games.length === 0) {
	// 	const localStorageState = JSON.parse(localStorage.getItem("state"));
	// 	games = localStorageState.user.games;
	// }
	const dispatch = useDispatch();
	const toggelPopHandler = () => {
		dispatch(actions.toggelPop());
	};
	const timeSort = (value) =>{		
		setSorting((data) => ({
			isAscending: !data.isAscending, value: value
		}));
	}
	return (
		<div className={`${classes["container"]} sortable`}>
			<table>
				<thead>
					<tr>
						<th onClick = {timeSort.bind(null, 'id')}>ID &diams;</th>
						<th>SLOT 1</th>
						<th>SLOT 2</th>
						<th>SLOT 3</th>
						<th onClick = {timeSort.bind(null, 'time')}>Time &diams;</th>
					</tr>
				</thead>
				<tbody>
					{games && games.map((row,index) => {
						return (
							<tr key={row.id} className = "item">
								<td>{row.id}</td>
								<td>{row.slot_1}</td>
								<td>{row.slot_2}</td>
								<td>{row.slot_3}</td>
								<td>{row.time}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className={classes.actions}>
				<button onClick={toggelPopHandler}>PLAY GAME</button>
			</div>
		</div>
	);
};

export default Content;
