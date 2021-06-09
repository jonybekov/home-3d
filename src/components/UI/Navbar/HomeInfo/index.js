import React from "react";
import { Row, Col, InfoItem } from "./style";
import { useTranslation } from "react-i18next";

export default function HomeInfo() {
  const { t } = useTranslation();
  return (
    <Row>
      <Col>
        <InfoItem>
          <div className='label'>{t("roomInfo:area")}</div>
          <div className='details'>80 m2</div>
        </InfoItem>
      </Col>
      <Col>
        <InfoItem>
          <div className='label'>{t("roomInfo:rooms")}</div>
          <div className='details'>4</div>
        </InfoItem>
      </Col>
      <Col>
        <InfoItem>
          <div className='label'>{t("roomInfo:floor")}</div>
          <div className='details'>3</div>
        </InfoItem>
      </Col>
    </Row>
  );
}
