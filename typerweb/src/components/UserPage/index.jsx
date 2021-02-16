import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Layout from '../Layout';
import { localStorageService } from '../../services/localStorageService';
import components from '../UserPage/styles';

const UserPage = () => {

    const dispatch = useDispatch();
    const username = localStorageService.username;
    const userId = localStorageService.userId;
    const { register, handleSubmit, errors } = useForm();
    const [isEmailEdited, setIsEmailEdited] = useState(false);
    const [isUsernameEdited, setIsUsernameEdited] = useState(false)
    const [isPasswordEdited, setIsPasswordEdited] = useState(false)
    const { email } = useSelector(x => x.userPageState);
    const { UserContainer, UserForm, UserHeader, UserInput, UserButton, UserData, UserLabel, UserSubmit, PasswordHeader,
        SubmitContainer, InputError } = components;
    useEffect(() => {
        const request = {
            username: `${username}`
        }
        Axios.get(`/user/getUserDetails/${username}`).then(res => {
            dispatch({ type: 'SET_USER_DETAILS', payload: res.data });
        })
    }, [])

    const changePassword = (data) => {
        const request = {
            userId: userId,
            email: email,
            username: username,
            password: data.changePassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword
        }
        console.log(request)
        Axios.put("/user", request).then(res => {
            setIsPasswordEdited(false);
            setIsUsernameEdited(false);
            setIsEmailEdited(false);
        });
    }
    const changeUsername = (data) => {
        if (data.username === username) {
            setIsPasswordEdited(false);
            setIsUsernameEdited(false);
            setIsEmailEdited(false);
            return;
        }
        const request = {
            userId: userId,
            email: email,
            username: data.username,
            password: data.password
        }
        console.log(request)
        Axios.put("/user", request).then(res => {
            localStorageService.username = data.username
            setIsPasswordEdited(false);
            setIsUsernameEdited(false);
            setIsEmailEdited(false);
        });
    }
    const changeEmail = (data) => {
        if (data.email === email) {
            setIsPasswordEdited(false);
            setIsUsernameEdited(false);
            setIsEmailEdited(false);
            return;
        }
        const request = {
            userId: userId,
            email: data.email,
            username: username,
            password: data.password
        }
        console.log(request)
        Axios.put("/user", request).then(res => {
            dispatch({
                type: "SET_USER_DETAILS",
                payload: {
                    username: username,
                    email: data.email
                }
            });
            setIsPasswordEdited(false);
            setIsUsernameEdited(false);
            setIsEmailEdited(false);
        });
    }


    return (
        <Layout>

            <UserContainer>
                <UserData>
                    <UserHeader>Nazwa użytkownika</UserHeader>
                    <UserLabel>{username}</UserLabel>
                </UserData>
                {isUsernameEdited ?
                    <UserForm onSubmit={handleSubmit(changeUsername)} >
                        <UserInput ref={register({ required: isPasswordEdited, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                            name="password" type="password" placeholder="Aktualne hasło"></UserInput>
                        {errors['password']?.type === 'pattern' && <InputError>hasło musi zawierać duża,małą literę oraz cyfrę</InputError>}
                        {errors['password']?.type === 'minLength' && <InputError>hasło musi zawierać minimum 6 znaków</InputError>}
                        {errors['password']?.type === 'required' && <InputError>pole wymagane</InputError>}

                        <UserInput defaultValue={username} ref={register({ required: true, minLength: 4 })} name="username"
                            type="text" placeholder="Nowa nazwa użytkownika">
                        </UserInput>
                        {errors['username']?.type === 'required' && <InputError>pole wymagane</InputError>}
                        {errors['username']?.type === 'minLength' && <InputError>nazwa użytkownika musi zawierać conajmniej 4 znaki</InputError>}

                        <SubmitContainer>
                            <UserButton onClick={() => setIsUsernameEdited(false)}> &lt; Anuluj</UserButton>
                            <UserSubmit type="submit">Zapisz zmiany</UserSubmit>
                        </SubmitContainer>
                    </UserForm> :
                    <UserButton onClick={() => { setIsUsernameEdited(true); setIsEmailEdited(false); setIsPasswordEdited(false); }}>
                        Edytuj &gt;</UserButton>
                }
                <UserData>
                    <UserHeader>Email</UserHeader>
                    <UserLabel>{email}</UserLabel>
                </UserData>
                {isEmailEdited ?
                    <UserForm onSubmit={handleSubmit(changeEmail)}>
                        <UserInput ref={register({ required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                            name="password" type="password" placeholder="Aktualne hasło"></UserInput>
                        {errors['password']?.type === 'pattern' && <InputError>hasło musi zawierać duża,małą literę oraz cyfrę</InputError>}
                        {errors['password']?.type === 'minLength' && <InputError>hasło musi zawierać minimum 6 znaków</InputError>}
                        {errors['password']?.type === 'required' && <InputError>pole wymagane</InputError>}
                        <UserInput defaultValue={email} ref={register({ required: true })} name="email" type="email" placeholder="Nowy email"></UserInput>
                        <SubmitContainer>
                            <UserButton onClick={() => setIsEmailEdited(false)}> &lt; Anuluj</UserButton>
                            <UserSubmit type="submit">Zapisz zmiany</UserSubmit>
                        </SubmitContainer>
                    </UserForm> :
                    <UserButton onClick={() => { setIsEmailEdited(true); setIsUsernameEdited(false); setIsPasswordEdited(false); }}>
                        Edytuj &gt;</UserButton>
                }
                <PasswordHeader>Zmiana Hasła</PasswordHeader>
                <UserInput name="changePassword" ref={register} type="password" placeholder="Aktualne hasło"></UserInput>
                {isPasswordEdited ?
                    <UserForm onSubmit={handleSubmit(changePassword)} >
                        <UserInput ref={register({ required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                            name="newPassword" type="password" placeholder="Nowe hasło"></UserInput>
                        {errors['newPassword']?.type === 'pattern' && <InputError>hasło musi zawierać duża,małą literę oraz cyfrę</InputError>}
                        {errors['newPassword']?.type === 'minLength' && <InputError>hasło musi zawierać minimum 6 znaków</InputError>}
                        {errors['newPassword']?.type === 'required' && <InputError>pole wymagane</InputError>}
                        <UserInput ref={register()}
                            name="confirmNewPassword" type="password" placeholder="Powtórz nowe hasło"></UserInput>
                        <SubmitContainer>
                            <UserButton onClick={() => setIsPasswordEdited(false)}> &lt; Anuluj</UserButton>
                            <UserSubmit type="submit">Zapisz zmiany</UserSubmit>
                        </SubmitContainer>
                    </UserForm> :
                    <UserButton onClick={() => { setIsPasswordEdited(true); setIsUsernameEdited(false); setIsEmailEdited(false); }}>
                        Edytuj &gt;</UserButton>
                }
            </UserContainer>
        </Layout>
    )
}

export default UserPage;