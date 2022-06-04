import { Button, Form, Layout, PageHeader } from "antd";
import Input from "rc-input";
import { useState } from "react";
import { useRecoilCallback } from "recoil";
import { LoginMutationVariables } from "../../api/generated";
import { useAuthMutations } from "../../selectors/auth";

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [loginApi] = useAuthMutations()

    const login = useRecoilCallback(() => async ({email, password}: Required<LoginMutationVariables>) => {
        setLoading(true);
        try {
            const [success] = await loginApi({email, password})
            if (success) {
                alert('login succeeded. todo: navigation')
            } else {
                alert('login failed.')
            }
        } catch(e) {
            console.error(e);
        }
        setLoading(false);
    })

    return <Layout>
        <PageHeader title="ログイン"/>
        <Form onFinish={login}>
            <Form.Item name="email">
                <Input type="email"/>
            </Form.Item>
            <Form.Item name="password">
                <Input type="password"/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary" loading={loading}>ログイン</Button>
            </Form.Item>
        </Form>
    </Layout>
}
export default LoginPage;
