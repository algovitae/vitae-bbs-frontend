import { Button, Card, Skeleton, Table } from "antd"
import React from "react";
import { useRecoilValue } from "recoil";
import { allUsersSelector } from "../../selectors/user";

const TopPageContent = () => {
    const data = useRecoilValue(allUsersSelector);
    console.log(data)
    return <Table dataSource={data} columns={[{dataIndex: "user_name"}]} />
}

const TopPage: React.FC = () => {
    return <Card>
        <Button>button</Button>
        <React.Suspense fallback={<Skeleton />}>
            <TopPageContent />
        </React.Suspense>
    </Card>
}
export default TopPage;
