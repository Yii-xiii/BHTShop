import './PersonalInfoPage.css'

import React from 'react'

const PersonalInfoPage = () => {
    return (
        <div className='personalinfopage'>
			<div className="head">
				<h1>������Ϣ</h1>
			</div>

			<div className="text">
				<h3>ID :</h3>
				<h3>���� :</h3>
				<h3>��ַ :</h3>
				<h3>�绰 :</h3>
			</div>

			<div className="textinfo">
				<div class="idinfo">
					<h4>���ID</h4>
					// getid
				</div>
				<div className="nameinfo">
					<h4>�������</h4>
					// getname
				</div>
				<div className="addinfo">
					<h4>�����ַ</h4>
					// getadd
				</div>
				<div className="phoneinfo">
					<h4>����绰</h4>
					//getphone
				</div>
			</div>
        </div>
    )
}

export default PersonalInfoPage