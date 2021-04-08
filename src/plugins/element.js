import Vue from "vue";
import {
  Button,
  Message,
  Menu,
  MenuItem,
  Container,
  Header,
  Main,
  Footer,
  Input,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Card,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Image,
  Table,
  TableColumn,
  Slider,
  Pagination,
  Tag, Tabs, TabPane,
} from "element-ui";

Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Slider)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)



//消息组件需要进行全局挂载
Vue.prototype.$message = Message;