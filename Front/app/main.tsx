"use client"
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function MainPage() {
    const [mailValue, setMailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>(''); 
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); 
    const [submitted, setSubmitted] = useState<boolean>(false); // Para saber si se envió el formulario
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true); // Para validar el email

    // Cuando cambia el email
    const onChangeMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMailValue(event.target.value); 
        validateEmail(event.target.value); 
    };

    // Cuando cambia la contraseña
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value); 
    };

    // Función para validar el email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        setIsEmailValid(emailRegex.test(email)); 
    };

    // Cada vez que cambia el email o la contraseña, verificamos si el botón debe estar activo
    useEffect(() => {
        if (mailValue !== '' && passwordValue !== '' && isEmailValid) {
            setIsButtonDisabled(false); 
        } else {
            setIsButtonDisabled(true); 
        }
    }, [mailValue, passwordValue, isEmailValid]);

    // Cuando se hace clic en "Submit"
    const handleSubmit = () => {
        if (mailValue && passwordValue) {
            setSubmitted(true); 
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 20
            }}>
            <h1 style={{ marginBottom: '30px', fontSize: '30px' }}>
                Envía tus datos
            </h1>
            <TextField
                style={{ height: '30px', width: '300px', marginBottom: '50px' }}
                onChange={onChangeMail}
                helperText="email"
                error={!isEmailValid} // Marca error si el email no es válido
                value={mailValue}
            />
            <TextField
                style={{ height: '30px', width: '300px', marginBottom: '50px' }}
                onChange={onChangePassword}
                helperText="contraseña"
                type="password" // Para que se oculte el texto
                value={passwordValue}
            />
            <Button
                variant='contained'
                color="primary"
                style={{ 
                    color: isButtonDisabled ? 'black' : 'white', 
                    backgroundColor: isButtonDisabled ? 'grey' : 'blue',
                    marginBottom: '30px' 
                }}
                onClick={handleSubmit}
                disabled={isButtonDisabled} // Desactivado si falta algo
            >
                Enviar
            </Button>
            {submitted && <p>¡Datos enviados con éxito!</p>}
        </div>
    );
}