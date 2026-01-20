import {
  Layout,
  Card,
  Space,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockFilled,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentails } from "../../types";
import Logo from "../../component/icons/Logo";
import { login, self, logout } from "../../http/api";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/usePermission";

/* ---------------- API helpers ---------------- */

const loginUser = async (credentails: Credentails) => {
  const data = await login(credentails);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

/* ---------------- Component ---------------- */

function LoginPages() {
  const { isAllowed } = usePermission();
  const { setUser, logout: logoutfs } = useAuthStore();

  // self query (manual trigger)
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  // login mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDatapromise = await refetch();
      // logout or redirect to client ui
      // window.location.href = "http://clientui/url"
      // admin , manager, customer
      // ye hamne hook ka use kiya baha true false ke basis pe hamne kam kiya 
      if (!isAllowed(selfDatapromise.data)) {
        await logout();
        logoutfs();
        return;
      }
           /// ye simple tha 
      /*  if (selfDatapromise.data.role === "customer") {
        await logout();
        logoutfs();
        return;
      }*/
      setUser(selfDatapromise.data);
    },
  });

  return (
    <Layout
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Space direction="vertical">
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Logo />
        </Layout.Content>

        <Card
          style={{ width: 300, border: "none" }}
          title={
            <Space
              style={{
                width: "100%",
                fontSize: 16,
                justifyContent: "center",
              }}
            >
              <LockFilled />
              Sign in
            </Space>
          }
        >
          <Form
            initialValues={{ remember: true }}
            onFinish={(values) => {
              mutate({
                email: values.username,
                password: values.password,
              });
            }}
          >
            {isError && error instanceof Error && (
              <Alert type="error" message={error.message} />
            )}

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username" },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Flex justify="space-between">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#">Forget password</a>
            </Flex>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isPending}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Layout>
  );
}

export default LoginPages;
