import React from 'react'
import * as moment from 'moment'

function History(props) {
    const { records } = props
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Run</th>
                        <th>Wicket</th>
                        <th>Match fee</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(record => (
                            <tr key={record._id}>
                                <td>{moment(record.date).format('DD-MM-YYYY')}</td>
                                <td>{record.run}</td>
                                <td>{record.wicket}</td>
                                <td>{`€${record.match_fee}`}</td>
                                <td>
                                    {/* <Link to={`/${isAuth().role}/player-record/read`} className='btn btn-primary btn-md mr-2'>View</Link> */}
                                    {/* <Link to={`/${isAuth().role}/player-record/update`} className='btn btn-warning btn-md mr-2'>Edit</Link> */}
                                    {/* <Link to={`/${isAuth().role}/player-record/delete`} className='btn btn-danger btn-md'>Delete</Link> */}
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default History
