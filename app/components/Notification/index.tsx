import React from "react";

import {Card, CardBody} from "@nextui-org/react";

export type NotificationProps = {
    title: string;
    description: string;
    status: "error" | "success"  | "warning" | "info";
};

export default function Notification({ title, description, status }: NotificationProps) {
  return (
    <Card>
    <CardBody>
      <p>{title}</p>
    </CardBody>
    </Card>
  );
}
