import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';
import logo from '../../assets/images/logo.svg';
import './styles.css';

interface PageHeaderProps {
    titulo: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>

                <img src={logo} alt="Logo Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.titulo}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
            
        </header>
    )
};

export default PageHeader;