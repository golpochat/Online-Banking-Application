import React from 'react';

const CardInfo = (props) => {
    const { heading, value, isMoney } = props
    return (
        <div className="col-sm-4">
            <div className="card">
                <div className="card-body text-center">
                    <h2 className="card-title text-success">{heading}</h2>
                    <hr />
                    {
                        isMoney ?
                            <h2>{`€${value}`}</h2>
                            :
                            <h2>{`${value}`}</h2>
                    }
                </div>
            </div>
        </div>
    )
}
export default CardInfo