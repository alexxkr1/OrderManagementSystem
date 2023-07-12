import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import PanelMenu from 'primevue/panelmenu'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Knob from 'primevue/knob'
import Dialog from 'primevue/dialog'
import Paginator from 'primevue/paginator'
import Slider from 'primevue/slider'
import InputSwitch from 'primevue/inputswitch'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import MultiSelect from 'primevue/multiselect'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import TreeSelect from 'primevue/treeselect'
import ProgressBar from 'primevue/progressbar'
import ToastService from 'primevue/toastservice'
import Password from 'primevue/password'
import Chart from 'primevue/chart'
import Inplace from 'primevue/inplace'
import Avatar from 'primevue/avatar'
import Breadcrumb from 'primevue/breadcrumb'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import ScrollPanel from 'primevue/scrollpanel'
import ColorPicker from 'primevue/colorpicker'
import Textarea from 'primevue/textarea';
import Chips from 'primevue/chips';
import Skeleton from 'primevue/skeleton';

import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import type { App } from 'vue'

export const primevueConfig = (app: App) => {
  app.directive('tooltip', Tooltip)
  app.component('Card', Card)
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Button', Button)
  app.component('InputText', InputText)
  app.component('PanelMenu', PanelMenu)
  app.component('TabView', TabView)
  app.component('TabPanel', TabPanel)
  app.component('Knob', Knob)
  app.component('Dialog', Dialog)
  app.component('Paginator', Paginator)
  app.component('Slider', Slider)
  app.component('InputSwitch', InputSwitch)
  app.component('InputNumber', InputNumber)
  app.component('Toast', Toast)
  app.component('MultiSelect', MultiSelect)
  app.component('Calendar', Calendar)
  app.component('Dropdown', Dropdown)
  app.component('FileUpload', FileUpload)
  app.component('TreeSelect', TreeSelect)
  app.component('ProgressBar', ProgressBar)
  app.component('Password', Password)
  app.component('Inplace', Inplace)
  app.component('Avatar', Avatar)
  app.component('Breadcrumb', Breadcrumb)
  app.component('Divider', Divider)
  app.component('Checkbox', Checkbox)
  app.directive('Badge', BadgeDirective)
  app.component('Badge', Badge)
  app.component('ScrollPanel', ScrollPanel)
  app.component('ColorPicker', ColorPicker)
  app.component('Textarea', Textarea)
  app.component('Chips', Chips)
  app.component('Skeleton', Skeleton)

  app.use(ToastService)
  app.use(PrimeVue)
}
