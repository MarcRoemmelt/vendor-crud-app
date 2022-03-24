import { Form } from 'formik';
import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
    margin: 10px 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
`;
