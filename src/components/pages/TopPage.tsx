import { Button, Card, Skeleton, Table } from "antd"
import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { apolloClient } from "../../api";
import { AllUsersDocument, LoginDocument, LoginMutation } from "../../api/generated";
import { allUsersSelector } from "../../selectors/user";

const TopPageContent = () => {
    const data = useRecoilValue(allUsersSelector);
    return <Table dataSource={data} columns={[{ dataIndex: "user_name" }]} rowKey="user_id" />
}

const TopPage: React.FC = () => {
    const login = useRecoilCallback(() => async () => {
        const { data, errors } = await apolloClient.mutate<LoginMutation>({ mutation: LoginDocument, variables: { email: 'hoge@example.com', password: 'password' } })
        if (errors) {
            console.error(errors)
            return;
        }
        console.log(data?.login);
        return;
    })
    return <Card>
        <Button onClick={login}>button</Button>
        <React.Suspense fallback={<Skeleton />}>
            <TopPageContent />
        </React.Suspense>
    </Card>
}
export default TopPage;
