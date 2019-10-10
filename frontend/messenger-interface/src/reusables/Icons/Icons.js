import React from "react";
import PropTypes from 'prop-types';
import * as IoIcons from 'react-icons/io';
import * as FaIncons from 'react-icons/fa';
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import * as GoIcons from "react-icons/go";
import * as GiIcons from "react-icons/gi";
import * as WiIcons from "react-icons/wi";

const Icon_Type = {
    IoIcons : IoIcons,
    FaIcons: FaIncons,
    MdIcons: MdIcons,
    TiIcons: TiIcons,
    GoIcons: GoIcons,
    GiIcons: GiIcons,
    WiIcons: WiIcons
}

 const ICONS = (props) => {
    const {type, name, iconClass, iconWrapper, title , onClick} = props;
    const Icon = Icon_Type[type][name];
    const iconTitle = title ? title : null;
    return(
        <div className={iconWrapper} > 
          <Icon className={iconClass} title = {iconTitle} onClick={onClick} />
        </div>
    )
}

ICONS.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    iconClass: PropTypes.string,
    iconWrapper: PropTypes.string,
    title: PropTypes.string
}

export {ICONS};