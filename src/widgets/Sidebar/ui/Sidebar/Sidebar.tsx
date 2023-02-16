import React from 'react';
import { classNames } from "shared/lib/classNames/classNames";
import classes from './Sidebar.module.scss';
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher/ThemeSwitcher";

interface ISidebarProps {
	className?: string;
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {
	const {
		className,
	} = props;

	const [ collapsed, setCollapsed ] = React.useState<boolean>(false);

	const onToggle = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div
			className={
				classNames(classes.sidebar, {
					[classes.collapsed]: collapsed,
				}, [ className ])
			}
		>
			<button onClick={ onToggle }>
				Toggle
			</button>

			<div className={ classNames(classes.switchers, {}, []) }>
				<ThemeSwitcher/>
			</div>
		</div>
	);
};