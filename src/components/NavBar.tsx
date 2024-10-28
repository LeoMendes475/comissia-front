import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';

export default function TemplateDemo() {
    const itemRenderer = (item: any) => (
        <div className='p-menuitem-content'>
            <a href={item.route} className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        </div>
    );
    const items = [
        {
            template: () => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-6 py-2">
                        <span className="font-medium text-xl">
                            <span className="text-primary">APP</span>
                        </span>
                    </span>
                );
            }
        },
        {
            separator: true
        },
        {
            label: 'Documents',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-search',
                    template: itemRenderer,
                    route: '/userlist'
                },
                {
                    label: 'Afiliados',
                    icon: 'pi pi-search',
                    template: itemRenderer,
                    route: '/affiliateslist'
                },
                {
                    label: 'Comissões',
                    icon: 'pi pi-search',
                    template: itemRenderer,
                    route: '/commissionlist'
                }
            ]
        },
        {
            separator: true
        }
    ];

    return (
        <div className="card flex justify-content-center border-r-2">
            <Menu model={items} className="w-full min-w-52 h-screen md:w-15rem bg-transparent" />
        </div>
    )
}
        