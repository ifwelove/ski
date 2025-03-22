import React, { useState } from 'react';
import { Form, Select, InputNumber, Card, Row, Col, Divider, Typography } from 'antd';
import { 
  EnvironmentOutlined, 
  UserOutlined, 
  BranchesOutlined, 
  ColumnHeightOutlined, 
  DashboardOutlined 
} from '@ant-design/icons';
import { UserInputs, BoardRecommendation, RidingStyle } from '../types/snowboard';
import 'antd/dist/reset.css';  // antd v5 的正确样式导入

const { Title, Text } = Typography;

const SnowboardSelector: React.FC = () => {
  const [form] = Form.useForm();
  const [recommendation, setRecommendation] = useState<BoardRecommendation | null>(null);

  // 計算推薦長度範圍
  const calculateLengthRange = (inputs: UserInputs): [number, number] => {
    const { region, gender, height, weight } = inputs;
    
    if (region === 'japan') {
      // 日本地區（身高為主）
      const baseLength = height * 0.9;
      return gender === 'male' 
        ? [baseLength - 5, baseLength + 5]
        : [baseLength - 10, baseLength];
    } else {
      // 台灣地區（體重為主）
      // 修正公式：將計算結果除以2
      const baseLength = (weight * 2.5 + 110) / 2;
      return gender === 'male'
        ? [baseLength - 5, baseLength + 5]
        : [baseLength - 10, baseLength];
    }
  };

  // 獲取推薦板型
  const getBoardProfile = (style: RidingStyle): string => {
    const profiles: Record<RidingStyle, string> = {
      'all-mountain': 'Hybrid (混合型)',
      'freestyle': 'Rocker (反拱) 或 Flat (平底)',
      'carving': 'Camber (正拱)'
    };
    return profiles[style];
  };

  // 獲取推薦硬度
  const getFlexRange = (style: RidingStyle): [number, number] => {
    const flexRanges: Record<RidingStyle, [number, number]> = {
      'all-mountain': [5, 7],
      'freestyle': [1, 5],
      'carving': [6, 10]
    };
    return flexRanges[style];
  };

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    if (values.region && values.gender && values.height && values.weight && values.ridingStyle) {
      const lengthRange = calculateLengthRange(values);
      const [flexMin, flexMax] = getFlexRange(values.ridingStyle);
      
      // 計算中間值
      const avgLength = (lengthRange[0] + lengthRange[1]) / 2;
      const avgFlex = (flexMin + flexMax) / 2;
      
      setRecommendation({
        lengthRange: {
          min: lengthRange[0],
          max: lengthRange[1],
          avg: avgLength
        },
        profile: getBoardProfile(values.ridingStyle),
        flex: {
          min: flexMin,
          max: flexMax,
          avg: avgFlex
        }
      });
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card
          title={
            <div style={{ textAlign: 'center' }}>
              <span role="img" aria-label="snowboarder" style={{ fontSize: '24px', marginRight: '8px' }}>🏂</span>
              <Title level={3} style={{ margin: 0, display: 'inline' }}>滑雪板選擇器</Title>
              <span role="img" aria-label="snowy mountain" style={{ fontSize: '24px', marginLeft: '8px' }}>🏔️</span>
            </div>
          }
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <Form
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              name="region"
              label={<><EnvironmentOutlined /> 計算方式</>}
              rules={[{ required: true, message: '請選擇計算方式' }]}
            >
              <Select>
                <Select.Option value="japan">以身高為主</Select.Option>
                <Select.Option value="taiwan">以體重為主</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="gender"
              label={<><UserOutlined /> 性別</>}
              rules={[{ required: true, message: '請選擇性別' }]}
            >
              <Select>
                <Select.Option value="male">男性</Select.Option>
                <Select.Option value="female">女性</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="ridingStyle"
              label={<><BranchesOutlined /> 滑雪風格</>}
              rules={[{ required: true, message: '請選擇滑雪風格' }]}
            >
              <Select>
                <Select.Option value="all-mountain">通用 (All-Mountain)</Select.Option>
                <Select.Option value="freestyle">平花 (Freestyle)</Select.Option>
                <Select.Option value="carving">刻滑 (Carving)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="height"
              label={<><ColumnHeightOutlined /> 身高 (cm)</>}
              rules={[
                { required: true, message: '請輸入身高' },
                { type: 'number', min: 140, max: 200, message: '身高應在140-200cm之間' }
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="weight"
              label={<><DashboardOutlined /> 體重 (kg)</>}
              rules={[
                { required: true, message: '請輸入體重' },
                { type: 'number', min: 40, max: 120, message: '體重應在40-120kg之間' }
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>

          {recommendation && (
            <>
              <Divider>
                <span role="img" aria-label="snowflake" style={{ fontSize: '20px' }}>❄️</span> 推薦結果 <span role="img" aria-label="snowflake" style={{ fontSize: '20px' }}>❄️</span>
              </Divider>
              <Card 
                type="inner" 
                style={{ 
                  background: 'linear-gradient(135deg, #e6f7ff 0%, #ffffff 100%)',
                  border: '1px solid #91d5ff'
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text strong>建議雪板長度：</Text>
                    <Text>{recommendation.lengthRange.min.toFixed(1)} - {recommendation.lengthRange.max.toFixed(1)} cm</Text>
                    <Text type="secondary">（推薦中間值：{recommendation.lengthRange.avg.toFixed(1)} cm）</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>建議板型：</Text>
                    <Text>{recommendation.profile}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>建議硬度：</Text>
                    <Text>{recommendation.flex.min} - {recommendation.flex.max}</Text>
                    <Text type="secondary">（推薦中間值：{recommendation.flex.avg.toFixed(1)}）</Text>
                  </Col>
                  <Col span={24}>
                    <Text type="secondary">
                      <span role="img" aria-label="lightbulb" style={{ marginRight: '4px' }}>💡</span>
                      初學者可選擇較短一級（低5cm）以利控制，進階者可選擇偏長以提升速度與穩定性。
                    </Text>
                  </Col>
                </Row>
              </Card>
            </>
          )}
        </Card>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Text type="secondary">
            <span role="img" aria-label="ski" style={{ marginRight: '4px' }}>🎿</span>
            根據您的身體特徵和滑雪風格，為您量身推薦合適的滑雪板規格
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default SnowboardSelector; 