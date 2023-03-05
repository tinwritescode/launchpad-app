import styled from 'styled-components';
import {Tabs} from 'antd'

export const Container = styled.div`
padding: 0 200px;`;

export const NavContainer = styled.div`
display: flex;
justify-content: space-between;`;

export const NavTabItem = styled.div`
`;

export const NavDropDownItem = styled.div`
`;

// custom Tabs antd component
export const StyledTabs = styled(Tabs)`
    .ant-tabs-nav {
        margin: 0;
        padding: 0;
        width: 50%;
        height: 50px;
        border: 1px solid #e8e8e8;
    }
    .ant-tabs-nav-list {
        margin: 0;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        }
        .ant-tabs-tab {
            margin: 0;
            padding: 0;
            font-size: 16px;
            line-height: 24px;
            color: red;
            border: red;
            border-bottom: 1px solid #e8e8e8;
            transition: all 0.3s ease;
            &:hover {
                color: #000000;
                border-bottom: 1px solid #000000;
                }
                &.ant-tabs-tab-active {
                    color: #000000;
                    border-bottom: 1px solid #000000;
                    }`;