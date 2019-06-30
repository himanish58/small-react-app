import React, { Component } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { toWords } from 'number-to-words';

class Homepage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedNumbers: [],
			selectedNumber: 0,
			openDialog: false
		};

		this.styles = {
			dropdown: {
				width: '50%',
				marginBottom: '2rem'
			},
			carousel: {
				height: '25rem'
			},
			button: {
				margin: '2rem 0'
			},
			dialog: {
				height: '15rem',
				width: '15rem'
			}
		}
	}

	dropdownChangeHandler = (e) => {
		let {selectedNumber, selectedNumbers} = this.state;
		selectedNumber = e.target.value;
		if(!selectedNumbers.includes(selectedNumber)) {
			selectedNumbers.push(selectedNumber);
		}
		this.setState({selectedNumber, selectedNumbers})
	}

	finishClickHandler = () => {
		this.setState({openDialog: true});
	}

	handleDialogClose = () => {
		this.setState({openDialog: false});
	}

	render() {
		let {selectedNumber, selectedNumbers, openDialog} = this.state;

		return (
			<div className="homepage-container">
				<div className="label">Select a Number</div>
				<Select style={this.styles.dropdown} value={this.state.selectedNumber} onChange={this.dropdownChangeHandler}>
					{
						[...Array(20)].map((item, index) => {
							return <MenuItem key={index} value={index+1}>{index+1}</MenuItem>;
						})
					}
				</Select>
				{
					!!selectedNumber && (
						[
						<Carousel style={this.styles.carousel} showThumbs={false}>
							{
								[...Array(selectedNumber)].map((item, index) => {
									return (
										<div className="item" key={index}>
											{toWords(index+1)}
										</div>
									);
								})
							}
						</Carousel>,
						<Button style={this.styles.button} variant="contained" color="primary" onClick={this.finishClickHandler}>Finish</Button>
						]
					)
				}
				{
					openDialog && (
						<Dialog open={openDialog} onClose={this.handleDialogClose}>
							<div className="modal-body">
								<div>You have selected</div>
								<div>{selectedNumbers.map((number, index) => {
									return `${number}${((index+1) < selectedNumbers.length)? ', ': ' '}`;
								})}</div>
							</div>
						</Dialog>
					)
				}
			</div>
		)
	}
}

export default Homepage;
