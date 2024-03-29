import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import classes from './Navbar.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface INavbarProps {
    className?: string;
}

const NavbarComponent: React.FC<INavbarProps> = (props) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const [ isAuthModal, setIsAuthModal ] = React.useState<boolean>(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onCloseModal = React.useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = React.useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = React.useCallback(() => {
        dispatch(userActions.logout());
    }, [ dispatch ]);

    if (authData) {
        return (
            <div className={ classNames(classes.navbar, {}, [ className ]) }>
                <Button theme={ ButtonTheme.CLEAR_INVERTED } onClick={ onLogout }>
                    { t('logout') }
                </Button>
            </div>
        );
    }

    return (
        <div className={ classNames(classes.navbar, {}, [ className ]) }>
            <Button theme={ ButtonTheme.CLEAR_INVERTED } onClick={ onShowModal }>
                { t('login') }
            </Button>
            { isAuthModal && <LoginModal
                isOpen={ isAuthModal }
                onClose={ onCloseModal }
            /> }
        </div>
    );
};

export const Navbar = React.memo( NavbarComponent );
