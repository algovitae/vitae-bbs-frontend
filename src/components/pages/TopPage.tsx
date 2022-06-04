import { Button, Card, Skeleton, Table } from "antd"
import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { apolloClient } from "../../api";
import { AllUsersDocument, LoginDocument, LoginMutation } from "../../api/generated";
import { allUsersSelector } from "../../selectors/user";
import { LoggedInUserName } from "../auth/LoggedInUserName";

const TopPageContent = () => {
    const data = useRecoilValue(allUsersSelector);
    return <Table dataSource={data} columns={[{ dataIndex: "user_name" }]} rowKey="user_id" />
}

const TopPage: React.FC = () => {
    return <Card>
        <Card>
            hello! you are <LoggedInUserName />
        </Card>
        <React.Suspense fallback={<Skeleton />}>
            <TopPageContent />
        </React.Suspense>
    </Card>
}
export default TopPage;
