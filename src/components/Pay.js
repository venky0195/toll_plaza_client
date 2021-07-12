import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress, FormControlLabel, Switch } from '@material-ui/core';
import { payToll } from '../services/network';

export default function Pay() {
    const [state, setState] = useState({ vehicleNumber: "", isTwoWay: false, error: false, loading: false })
    const handleSubmit = (e) => {
        e.preventDefault()
        setState({ ...state, loading: true })
        payToll(state).then((response) => {
            setState({ ...state, isTwoWay: false, vehicleNumber: "", loading: false })
            alert(`Receipt Number: ${response.data.receipt.receiptNumber}`)
        }).catch((err) => {
            (err && err.response && err.response.data) ? alert(err.response.data) : alert("Server Error")
            setState({ ...state, loading: false })
        })
    }
    const handleChange = (event) => {
        if (event.target.name === "isTwoWay") {
            setState({ ...state, isTwoWay: event.target.checked })
        } else {
            event.target.value === "" ? setState({ ...state, error: "Vehicle Number is required", vehicleNumber: event.target.value }) : setState({ ...state, error: false, vehicleNumber: event.target.value })
        }
    }
    return (
        <Fragment>
            {
                state.loading ? <div className="mar-1-rem text-center">
                    <CircularProgress />
                </div> :
                    <form className="flex-col-center " onSubmit={handleSubmit} noValidate>
                        <div className="text-center">
                            <div className="mar-1-rem">
                                <TextField
                                    required
                                    id="vehicleNumber"
                                    label="Vehicle Number"
                                    autoComplete="off"
                                    helperText={state.error ? state.error : null}
                                    onChange={handleChange}
                                    error={state.error ? true : false} />
                            </div>
                            <div className="mar-1-rem">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.isTwoWay}
                                            onChange={handleChange}
                                            color="primary"
                                            name="isTwoWay"
                                        />
                                    }
                                    label="Return ticket needed"
                                />
                            </div>
                            <div className="mar-1-rem">
                                Total Amount : {state.isTwoWay ? '200' : '100'}
                            </div>
                        </div>
                        <div>
                            <Button
                                disabled={state.vehicleNumber.length === 0}
                                variant="contained"
                                type="submit"
                                color="primary" >
                                Submit
                            </Button>
                        </div>
                    </form>}
        </Fragment>
    );
}