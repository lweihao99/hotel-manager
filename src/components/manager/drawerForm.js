import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  notification,
  Select,
  Space,
  message,
  Input,
  DatePicker,
  Upload,
  Progress,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  _add_account_role,
  _edit_role,
  _avatar_upload,
} from "../api/accountManageApi";

import { BASE_URL } from "../config/config";

// drawer form layout
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const ROLE = [
  "manager",
  "reception",
  "chef",
  "reservation",
  "front office",
  "staff",
];

const STAFF_STATUS = ["active", "inactive", "vacation"];

// read file, 将图片文件转换为base64编码的字符串,用于在网页中直接显示图片
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result)); // 文件加载完成后，将转换过的图片地址作为参数给回调函数
  reader.readAsDataURL(img); // 将文件读取为base64字符串, 将指定文件读取为Data Url,并在读取完之后可以通过FileReader对象的"result"属性获取到这个Data Url,也就是说可以通过回调函数中获取这个Data Url
};

// 设定上传的图片格式和大小
const beforeUpload = (file, fileList) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"; //确定图片类型
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const limit = 5; //设定图片大小限制
  const isLt = file.size / 1024 / 1024 < limit; // 限制文件大小,转化字节为MB然后小于一定的单位
  if (!isLt) {
    message.error(`Image must smaller than ${limit}MB!`);
  }

  return isJpgOrPng && isLt; // 返回文件类型和大小
};

// jsx
function DrawerForm({ setDrawerClose, setRoleList, roleId, oldRole }) {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [progress, setProgress] = useState(0);

  // 在点击edit之后将旧数据显示在form上
  useEffect(() => {
    if (roleId) {
      form.setFieldsValue(oldRole);
    }
  }, [oldRole, form, roleId]);

  // 添加所有信息
  const onFinish = async (values) => {
    try {
      console.log(values);
      // 如果是点击add那么就没有roleId,   // add new role
      if (!roleId) {
        const res = await _add_account_role(values);
        console.log(res);
        const { data } = res.data;

        // console.log(data);

        if (res.status === 200) {
          openNotificationWithIcon("success", data.name, data.role);

          // todo 在手动更新数据之后由于没有重新设计日期，日期会保持数据库的样子，需要在前端或者后端进行日期的format以保证是年月日
          // 手动更新数据
          setRoleList((prev) => [...prev, { key: data.roleId, ...data }]);
        }
        setDrawerClose(false);
        form.resetFields();
        setImageUrl("");
      } else {
        // 修改的情况下会有roleId传入 // edit role
        const oldData = { ...values };
        const id = roleId;
        const res = await _edit_role(id, oldData);
        const { status, data } = res.data;
        if (status) {
          setDrawerClose(false);
          openNotificationWithIcon("success", data.accountName, data.role);
          form.resetFields();
          // update data to re-render
          setRoleList((prev) =>
            prev.map((item) =>
              item.roleId === data.roleId ? { ...data, key: data.roleId } : item
            )
          );
        }
      }
    } catch (error) {
      message.error(error.message);
      console.error(error);
    }
  };

  // todo 需要封装消息通知保证复用性
  // notification on create
  const openNotificationWithIcon = (type, name, role) => {
    api[type]({
      message: "You have add new account successfully.",
      description: `Account "${name}" (${role}) has been created.`,
      duration: 3,
    });
  };

  // todo 由于可能handleUpload会在handleChange之前执行，所以第一次上传图片的时候可能会没有imageUrl导致DatatoURLBlob函数接收不到参数，从而报错的bug，需要解决
  // info change, ·监视图片变化
  const handleChange = ({ file, fileList }) => {
    if (file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (file.status === "done") {
      // Get this url from response in real world.
      getBase64(file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // 将DataURL 转换为 Blob 类型数据
  const dataURLtoBlob = (dataURL) => {
    // 使用atob 将 base64字符串解析为原始二进制代码
    const base64ToByte = atob(dataURL.split(",")[1]);
    // 获取 DataURL MIME 类型
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0]; // 注意 data:image/jpeg;base64,/9j/4...
    const bynaryArray = new ArrayBuffer(base64ToByte.length); // 创建一个具有指定长度的ArrayBuffer对象, 而ArrayBuffer 是一个可以存放二进制数据的连续内存区域， 这里就是生成一个相当于byteString长度的字节区域,也就是解码后的二进制数据的长度。
    const int8Array = new Uint8Array(bynaryArray); // 创建一个Uint8Array视图，用于操作ArrayBuffer的二进制数据。二进制数据只能通过视图来进行操作，Uint8Array是将ArrayBuffer的每个字节视为0-255之间的单个数组（每个字节8位）
    for (let i = 0; i < base64ToByte.length; i++) {
      int8Array[i] = base64ToByte.charCodeAt(i); // 返回指定位置字符的Unicode编码，将解码后的二进制数据的ACII值存储到 Uint8Array中
    }
    // todo 添加一个original name进行区分
    return new Blob([bynaryArray], { type: mimeString }); // 创建一个Blob对象，用于存放二进制数据，并指定MIME类型
  };

  // 自定义图片上传
  const handleUpload = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    if (!imageUrl) {
      getBase64(file, (url) => {
        setImageUrl(url);
      });
      message.error("please select image again.");
      return;
    }

    const blob = dataURLtoBlob(imageUrl);

    const formData = new FormData();

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / event.total) || 0;
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded * 100) / event.total });
      },
    };

    // todo 在确认可以直接在blob里面添加name后删除File直接使用blob传参
    // 创建一个File对象实例，并指定文件名以及mimetype
    const newFile = new File([blob], `${file.name}`, { type: blob.type });
    console.log(newFile);

    formData.append("photo", newFile); // 如果直接将blob对象添加到FormData中，那么Blob对象的文件名默认为"blob"

    try {
      const res = await _avatar_upload(formData, config);

      onSuccess("Ok");
      console.log(res);
    } catch (error) {
      console.error(error);
      onError({ error });
    }
  };

  // 设置上传按钮样式
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      {contextHolder}
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        {/* input */}
        <Form.Item name="name" label="Staff Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: false }]}>
          <Input />
        </Form.Item>

        {/* options */}
        <Form.Item
          name="role"
          label="Role Name"
          rules={[
            {
              required: true,
              message: "Please select the role name!",
            },
          ]}
        >
          <Select placeholder="Select a role type." allowClear>
            {ROLE.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Staff Status"
          rules={[
            {
              required: true,
              message: "Please select the Status!",
            },
          ]}
        >
          <Select placeholder="Select." allowClear>
            {STAFF_STATUS.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="birthDate" label="Birth" rules={[{ required: true }]}>
          <DatePicker
            style={{ marginBottom: "2rem" }}
            placeholder="Select Birth"
            wrapperCol={{ span: 18 }}
            allowClear
          />
        </Form.Item>
        <Form.Item
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Upload
            name="photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action={`${BASE_URL}api/avatar`}
            beforeUpload={beforeUpload} // return false antd doesn't upload
            onChange={handleChange}
            customRequest={handleUpload}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          {progress > 0 && <Progress percent={progress} />}
        </Form.Item>

        {/* todo add phone number, email and birth data input */}

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              {roleId ? "EDIT ROLE" : "ADD ROLE"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DrawerForm;
