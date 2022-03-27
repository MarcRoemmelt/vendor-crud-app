import { Form } from 'formik';
import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
    margin: 10px 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

export const StyledForm = styled(Form)`
    max-width: 90%;
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
`;
