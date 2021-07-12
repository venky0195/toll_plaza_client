import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, CircularProgress } from '@material-ui/core';
import { verifyReceipt } from '../services/network';

export default function HasTicket() {
    const [transactionNumber, setTransactionNo] = useState("")
    const [errors, setError] = useState({ transactionNo: false })
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        verifyReceipt(transactionNumber).then((response) => {
            setLoading(false)
            response.data.isValid ? alert("Receipt is valid") : alert("Receipt is invalid")
        }).catch((err) => {
            (err && err.response && err.response.data) ? alert(err.response.data) : alert("Server Error")
            setLoading(false)
        })

    }
    const handleChange = (event) => {
        event.target.value === "" ? setError({ transactionNo: "transaction Number is required" }) : setError({ transactionNo: false })
        setTransactionNo(event.target.value)
    }
    return (
        <Fragment>
            {
                loading ? <div className="mar-1-rem text-center">
                    <CircularProgress />
                </div> :
                    <form className="flex-col-center mar-1-rem" onSubmit={handleSubmit} noValidate>
                        <div>
                            <TextField
                                required
                                id="transactionId"
                                label="Transaction Number"
                                autoComplete="off"
                                helperText={errors.transactionNo ? errors.transactionNo : null}
                                onChange={handleChange}
                                error={errors.transactionNo ? true : false} />
                        </div>
                        <div>
                            <Button
                                disabled={transactionNumber.length === 0}
                                variant="contained"
                                type="submit"
                                color="primary" >
                                Verify
                            </Button>
                        </div>
                    </form>}
        </Fragment>
    );
}