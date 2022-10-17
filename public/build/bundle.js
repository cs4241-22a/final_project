
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (svelteRouting) {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.51.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const menu = writable(0);

    /* src/form.svelte generated by Svelte v3.51.0 */

    const file$9 = "src/form.svelte";

    function create_fragment$9(ctx) {
    	let div16;
    	let h1;
    	let t1;
    	let div1;
    	let label0;
    	let t3;
    	let div0;
    	let input0;
    	let t4;
    	let div3;
    	let label1;
    	let t6;
    	let div2;
    	let input1;
    	let t7;
    	let span0;
    	let i0;
    	let t8;
    	let span1;
    	let i1;
    	let t9;
    	let div5;
    	let label2;
    	let t11;
    	let div4;
    	let input2;
    	let t12;
    	let span2;
    	let i2;
    	let t13;
    	let span3;
    	let i3;
    	let t14;
    	let div7;
    	let label3;
    	let t16;
    	let div6;
    	let input3;
    	let t17;
    	let span4;
    	let i4;
    	let t18;
    	let span5;
    	let i5;
    	let t19;
    	let div10;
    	let label4;
    	let t21;
    	let div9;
    	let div8;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let t25;
    	let div12;
    	let label5;
    	let t27;
    	let div11;
    	let textarea;
    	let t28;
    	let div15;
    	let div13;
    	let button0;
    	let t30;
    	let div14;
    	let button1;

    	const block = {
    		c: function create() {
    			div16 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Submit A Resource";
    			t1 = space();
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Name";
    			t3 = space();
    			div0 = element("div");
    			input0 = element("input");
    			t4 = space();
    			div3 = element("div");
    			label1 = element("label");
    			label1.textContent = "Email";
    			t6 = space();
    			div2 = element("div");
    			input1 = element("input");
    			t7 = space();
    			span0 = element("span");
    			i0 = element("i");
    			t8 = space();
    			span1 = element("span");
    			i1 = element("i");
    			t9 = space();
    			div5 = element("div");
    			label2 = element("label");
    			label2.textContent = "Resource Title";
    			t11 = space();
    			div4 = element("div");
    			input2 = element("input");
    			t12 = space();
    			span2 = element("span");
    			i2 = element("i");
    			t13 = space();
    			span3 = element("span");
    			i3 = element("i");
    			t14 = space();
    			div7 = element("div");
    			label3 = element("label");
    			label3.textContent = "Resource Link";
    			t16 = space();
    			div6 = element("div");
    			input3 = element("input");
    			t17 = space();
    			span4 = element("span");
    			i4 = element("i");
    			t18 = space();
    			span5 = element("span");
    			i5 = element("i");
    			t19 = space();
    			div10 = element("div");
    			label4 = element("label");
    			label4.textContent = "What Subject is this?";
    			t21 = space();
    			div9 = element("div");
    			div8 = element("div");
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Fullstack/Design";
    			option1 = element("option");
    			option1.textContent = "Theory";
    			option2 = element("option");
    			option2.textContent = "Cybersecurity";
    			t25 = space();
    			div12 = element("div");
    			label5 = element("label");
    			label5.textContent = "Give a small description of the resource";
    			t27 = space();
    			div11 = element("div");
    			textarea = element("textarea");
    			t28 = space();
    			div15 = element("div");
    			div13 = element("div");
    			button0 = element("button");
    			button0.textContent = "Submit";
    			t30 = space();
    			div14 = element("div");
    			button1 = element("button");
    			button1.textContent = "Cancel";
    			attr_dev(h1, "class", "title is-2 has-text-centered");
    			add_location(h1, file$9, 1, 4, 69);
    			attr_dev(label0, "class", "label");
    			add_location(label0, file$9, 4, 8, 197);
    			attr_dev(input0, "class", "input");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Name");
    			attr_dev(input0, "id", "name");
    			add_location(input0, file$9, 6, 10, 271);
    			attr_dev(div0, "class", "control");
    			add_location(div0, file$9, 5, 8, 239);
    			attr_dev(div1, "class", "field");
    			add_location(div1, file$9, 3, 4, 169);
    			attr_dev(label1, "class", "label");
    			add_location(label1, file$9, 12, 8, 410);
    			attr_dev(input1, "class", "input");
    			attr_dev(input1, "type", "email");
    			attr_dev(input1, "placeholder", "Email input");
    			attr_dev(input1, "id", "email");
    			add_location(input1, file$9, 14, 10, 516);
    			attr_dev(i0, "class", "fas fa-envelope");
    			add_location(i0, file$9, 16, 12, 647);
    			attr_dev(span0, "class", "icon is-small is-left");
    			add_location(span0, file$9, 15, 10, 598);
    			attr_dev(i1, "class", "fas fa-exclamation-triangle");
    			add_location(i1, file$9, 19, 12, 757);
    			attr_dev(span1, "class", "icon is-small is-right");
    			add_location(span1, file$9, 18, 10, 707);
    			attr_dev(div2, "class", "control has-icons-left has-icons-right");
    			add_location(div2, file$9, 13, 8, 453);
    			attr_dev(div3, "class", "field");
    			add_location(div3, file$9, 11, 6, 382);
    			attr_dev(label2, "class", "label");
    			add_location(label2, file$9, 25, 8, 882);
    			attr_dev(input2, "class", "input");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "placeholder", "Title");
    			attr_dev(input2, "id", "resource_title");
    			add_location(input2, file$9, 27, 10, 997);
    			attr_dev(i2, "class", "fas fa-user");
    			add_location(i2, file$9, 29, 12, 1130);
    			attr_dev(span2, "class", "icon is-small is-left");
    			add_location(span2, file$9, 28, 10, 1081);
    			attr_dev(i3, "class", "fas fa-check");
    			add_location(i3, file$9, 32, 12, 1236);
    			attr_dev(span3, "class", "icon is-small is-right");
    			add_location(span3, file$9, 31, 10, 1186);
    			attr_dev(div4, "class", "control has-icons-left has-icons-right");
    			add_location(div4, file$9, 26, 8, 934);
    			attr_dev(div5, "class", "field");
    			add_location(div5, file$9, 24, 6, 854);
    			attr_dev(label3, "class", "label");
    			add_location(label3, file$9, 38, 8, 1352);
    			attr_dev(input3, "class", "input");
    			attr_dev(input3, "type", "url");
    			attr_dev(input3, "placeholder", "URL");
    			attr_dev(input3, "id", "resource_link");
    			add_location(input3, file$9, 40, 10, 1466);
    			attr_dev(i4, "class", "fas fa-envelope");
    			add_location(i4, file$9, 42, 12, 1595);
    			attr_dev(span4, "class", "icon is-small is-left");
    			add_location(span4, file$9, 41, 10, 1546);
    			attr_dev(i5, "class", "fas fa-exclamation-triangle");
    			add_location(i5, file$9, 45, 12, 1705);
    			attr_dev(span5, "class", "icon is-small is-right");
    			add_location(span5, file$9, 44, 10, 1655);
    			attr_dev(div6, "class", "control has-icons-left has-icons-right");
    			add_location(div6, file$9, 39, 8, 1403);
    			attr_dev(div7, "class", "field");
    			add_location(div7, file$9, 37, 6, 1324);
    			attr_dev(label4, "class", "label");
    			add_location(label4, file$9, 51, 8, 1830);
    			option0.__value = "Fullstack/Design";
    			option0.value = option0.__value;
    			add_location(option0, file$9, 55, 14, 1990);
    			option1.__value = "Theory";
    			option1.value = option1.__value;
    			add_location(option1, file$9, 56, 14, 2038);
    			option2.__value = "Cybersecurity";
    			option2.value = option2.__value;
    			add_location(option2, file$9, 57, 14, 2076);
    			attr_dev(select, "id", "subject");
    			add_location(select, file$9, 54, 12, 1954);
    			attr_dev(div8, "class", "select");
    			add_location(div8, file$9, 53, 10, 1921);
    			attr_dev(div9, "class", "control");
    			add_location(div9, file$9, 52, 8, 1889);
    			attr_dev(div10, "class", "field");
    			add_location(div10, file$9, 50, 6, 1802);
    			attr_dev(label5, "class", "label");
    			add_location(label5, file$9, 64, 8, 2215);
    			attr_dev(textarea, "class", "textarea");
    			attr_dev(textarea, "placeholder", "Textarea");
    			attr_dev(textarea, "id", "desc");
    			add_location(textarea, file$9, 66, 10, 2325);
    			attr_dev(div11, "class", "control");
    			add_location(div11, file$9, 65, 8, 2293);
    			attr_dev(div12, "class", "field");
    			add_location(div12, file$9, 63, 6, 2187);
    			attr_dev(button0, "class", "button is-link");
    			attr_dev(button0, "id", "submit");
    			add_location(button0, file$9, 72, 10, 2509);
    			attr_dev(div13, "class", "control");
    			add_location(div13, file$9, 71, 8, 2477);
    			attr_dev(button1, "class", "button is-link is-light");
    			attr_dev(button1, "id", "cancel");
    			add_location(button1, file$9, 75, 10, 2623);
    			attr_dev(div14, "class", "control");
    			add_location(div14, file$9, 74, 8, 2591);
    			attr_dev(div15, "class", "field is-grouped");
    			add_location(div15, file$9, 70, 6, 2438);
    			attr_dev(div16, "class", "column has-background-primary");
    			attr_dev(div16, "id", "submit_resource");
    			add_location(div16, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div16, anchor);
    			append_dev(div16, h1);
    			append_dev(div16, t1);
    			append_dev(div16, div1);
    			append_dev(div1, label0);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, input0);
    			append_dev(div16, t4);
    			append_dev(div16, div3);
    			append_dev(div3, label1);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, input1);
    			append_dev(div2, t7);
    			append_dev(div2, span0);
    			append_dev(span0, i0);
    			append_dev(div2, t8);
    			append_dev(div2, span1);
    			append_dev(span1, i1);
    			append_dev(div16, t9);
    			append_dev(div16, div5);
    			append_dev(div5, label2);
    			append_dev(div5, t11);
    			append_dev(div5, div4);
    			append_dev(div4, input2);
    			append_dev(div4, t12);
    			append_dev(div4, span2);
    			append_dev(span2, i2);
    			append_dev(div4, t13);
    			append_dev(div4, span3);
    			append_dev(span3, i3);
    			append_dev(div16, t14);
    			append_dev(div16, div7);
    			append_dev(div7, label3);
    			append_dev(div7, t16);
    			append_dev(div7, div6);
    			append_dev(div6, input3);
    			append_dev(div6, t17);
    			append_dev(div6, span4);
    			append_dev(span4, i4);
    			append_dev(div6, t18);
    			append_dev(div6, span5);
    			append_dev(span5, i5);
    			append_dev(div16, t19);
    			append_dev(div16, div10);
    			append_dev(div10, label4);
    			append_dev(div10, t21);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(div16, t25);
    			append_dev(div16, div12);
    			append_dev(div12, label5);
    			append_dev(div12, t27);
    			append_dev(div12, div11);
    			append_dev(div11, textarea);
    			append_dev(div16, t28);
    			append_dev(div16, div15);
    			append_dev(div15, div13);
    			append_dev(div13, button0);
    			append_dev(div15, t30);
    			append_dev(div15, div14);
    			append_dev(div14, button1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div16);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/footer.svelte generated by Svelte v3.51.0 */

    const file$8 = "src/footer.svelte";

    function create_fragment$8(ctx) {
    	let footer;
    	let div;
    	let p0;
    	let strong;
    	let t1;
    	let t2;
    	let p1;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div = element("div");
    			p0 = element("p");
    			strong = element("strong");
    			strong.textContent = "How to Survive CS@WPI";
    			t1 = text(" by Hailey Anderson & Chayanne Sandoval-Williams.");
    			t2 = space();
    			p1 = element("p");
    			p1.textContent = "For CS 4241: Webware Computational Technology For Network Information Systems";
    			add_location(strong, file$8, 3, 8, 98);
    			add_location(p0, file$8, 2, 6, 86);
    			add_location(p1, file$8, 5, 6, 203);
    			attr_dev(div, "class", "content has-text-centered");
    			add_location(div, file$8, 1, 4, 40);
    			attr_dev(footer, "class", "footer");
    			attr_dev(footer, "id", "footer");
    			add_location(footer, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div);
    			append_dev(div, p0);
    			append_dev(p0, strong);
    			append_dev(p0, t1);
    			append_dev(div, t2);
    			append_dev(div, p1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/card.svelte generated by Svelte v3.51.0 */

    const file$7 = "src/card.svelte";

    function create_fragment$7(ctx) {
    	let div3;
    	let div2;
    	let header;
    	let p;
    	let t0;
    	let t1;
    	let a0;
    	let span;
    	let i;
    	let t2;
    	let div1;
    	let div0;
    	let t3;
    	let t4;
    	let a1;
    	let t5;
    	let t6;
    	let br0;
    	let t7;
    	let a2;
    	let t8;
    	let t9;
    	let t10;
    	let br1;
    	let t11;
    	let time;
    	let t13;
    	let footer;
    	let a3;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			header = element("header");
    			p = element("p");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			a0 = element("a");
    			span = element("span");
    			i = element("i");
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t3 = text(/*desc*/ ctx[1]);
    			t4 = space();
    			a1 = element("a");
    			t5 = text(/*link*/ ctx[2]);
    			t6 = space();
    			br0 = element("br");
    			t7 = space();
    			a2 = element("a");
    			t8 = text("#");
    			t9 = text(/*tag*/ ctx[3]);
    			t10 = space();
    			br1 = element("br");
    			t11 = text("\n                Added: ");
    			time = element("time");
    			time.textContent = "12:10 PM - 10 Oct 2022";
    			t13 = space();
    			footer = element("footer");
    			a3 = element("a");
    			a3.textContent = "Save";
    			attr_dev(p, "class", "card-header-title");
    			add_location(p, file$7, 10, 12, 197);
    			attr_dev(i, "class", "fas fa-angle-down");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$7, 15, 20, 400);
    			attr_dev(span, "class", "icon");
    			add_location(span, file$7, 14, 16, 360);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "card-header-icon");
    			attr_dev(a0, "aria-label", "more options");
    			add_location(a0, file$7, 13, 12, 280);
    			attr_dev(header, "class", "card-header");
    			add_location(header, file$7, 9, 8, 156);
    			attr_dev(a1, "href", /*link*/ ctx[2]);
    			add_location(a1, file$7, 22, 16, 620);
    			add_location(br0, file$7, 23, 16, 662);
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$7, 24, 16, 683);
    			add_location(br1, file$7, 25, 16, 749);
    			attr_dev(time, "datetime", "2022-10-10");
    			add_location(time, file$7, 26, 23, 777);
    			attr_dev(div0, "class", "content");
    			add_location(div0, file$7, 20, 12, 559);
    			attr_dev(div1, "class", "card-content");
    			add_location(div1, file$7, 19, 8, 520);
    			attr_dev(a3, "href", "#");
    			attr_dev(a3, "class", "card-footer-item");
    			add_location(a3, file$7, 30, 12, 918);
    			attr_dev(footer, "class", "card-footer");
    			add_location(footer, file$7, 29, 8, 877);
    			attr_dev(div2, "class", "card");
    			add_location(div2, file$7, 8, 4, 129);
    			attr_dev(div3, "class", "column");
    			add_location(div3, file$7, 7, 0, 104);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, header);
    			append_dev(header, p);
    			append_dev(p, t0);
    			append_dev(header, t1);
    			append_dev(header, a0);
    			append_dev(a0, span);
    			append_dev(span, i);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, a1);
    			append_dev(a1, t5);
    			append_dev(div0, t6);
    			append_dev(div0, br0);
    			append_dev(div0, t7);
    			append_dev(div0, a2);
    			append_dev(a2, t8);
    			append_dev(a2, t9);
    			append_dev(div0, t10);
    			append_dev(div0, br1);
    			append_dev(div0, t11);
    			append_dev(div0, time);
    			append_dev(div2, t13);
    			append_dev(div2, footer);
    			append_dev(footer, a3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			if (dirty & /*desc*/ 2) set_data_dev(t3, /*desc*/ ctx[1]);
    			if (dirty & /*link*/ 4) set_data_dev(t5, /*link*/ ctx[2]);

    			if (dirty & /*link*/ 4) {
    				attr_dev(a1, "href", /*link*/ ctx[2]);
    			}

    			if (dirty & /*tag*/ 8) set_data_dev(t9, /*tag*/ ctx[3]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Card', slots, []);
    	let { title } = $$props;
    	let { desc } = $$props;
    	let { link } = $$props;
    	let { tag } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<Card> was created without expected prop 'title'");
    		}

    		if (desc === undefined && !('desc' in $$props || $$self.$$.bound[$$self.$$.props['desc']])) {
    			console.warn("<Card> was created without expected prop 'desc'");
    		}

    		if (link === undefined && !('link' in $$props || $$self.$$.bound[$$self.$$.props['link']])) {
    			console.warn("<Card> was created without expected prop 'link'");
    		}

    		if (tag === undefined && !('tag' in $$props || $$self.$$.bound[$$self.$$.props['tag']])) {
    			console.warn("<Card> was created without expected prop 'tag'");
    		}
    	});

    	const writable_props = ['title', 'desc', 'link', 'tag'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('link' in $$props) $$invalidate(2, link = $$props.link);
    		if ('tag' in $$props) $$invalidate(3, tag = $$props.tag);
    	};

    	$$self.$capture_state = () => ({ title, desc, link, tag });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(1, desc = $$props.desc);
    		if ('link' in $$props) $$invalidate(2, link = $$props.link);
    		if ('tag' in $$props) $$invalidate(3, tag = $$props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, desc, link, tag];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { title: 0, desc: 1, link: 2, tag: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get title() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/index.svelte generated by Svelte v3.51.0 */
    const file$6 = "src/index.svelte";

    function create_fragment$6(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let br2;
    	let t3;
    	let br3;
    	let t4;
    	let section;
    	let div0;
    	let h3;
    	let t6;
    	let p0;
    	let t8;
    	let p1;
    	let t10;
    	let p2;
    	let t12;
    	let p3;
    	let t14;
    	let br4;
    	let t15;
    	let div5;
    	let div4;
    	let div1;
    	let h10;
    	let t17;
    	let card0;
    	let t18;
    	let card1;
    	let t19;
    	let card2;
    	let t20;
    	let div2;
    	let h11;
    	let t22;
    	let card3;
    	let t23;
    	let card4;
    	let t24;
    	let card5;
    	let t25;
    	let div3;
    	let form;
    	let t26;
    	let br5;
    	let t27;
    	let br6;
    	let t28;
    	let footer;
    	let current;
    	const card0_spread_levels = [/*cyberChef*/ ctx[0]];
    	let card0_props = {};

    	for (let i = 0; i < card0_spread_levels.length; i += 1) {
    		card0_props = assign(card0_props, card0_spread_levels[i]);
    	}

    	card0 = new Card({ props: card0_props, $$inline: true });
    	const card1_spread_levels = [/*sqlZoo*/ ctx[1]];
    	let card1_props = {};

    	for (let i = 0; i < card1_spread_levels.length; i += 1) {
    		card1_props = assign(card1_props, card1_spread_levels[i]);
    	}

    	card1 = new Card({ props: card1_props, $$inline: true });
    	const card2_spread_levels = [/*discreteMath*/ ctx[2]];
    	let card2_props = {};

    	for (let i = 0; i < card2_spread_levels.length; i += 1) {
    		card2_props = assign(card2_props, card2_spread_levels[i]);
    	}

    	card2 = new Card({ props: card2_props, $$inline: true });
    	const card3_spread_levels = [/*hciBibs*/ ctx[3]];
    	let card3_props = {};

    	for (let i = 0; i < card3_spread_levels.length; i += 1) {
    		card3_props = assign(card3_props, card3_spread_levels[i]);
    	}

    	card3 = new Card({ props: card3_props, $$inline: true });
    	const card4_spread_levels = [/*cyberAwareness*/ ctx[4]];
    	let card4_props = {};

    	for (let i = 0; i < card4_spread_levels.length; i += 1) {
    		card4_props = assign(card4_props, card4_spread_levels[i]);
    	}

    	card4 = new Card({ props: card4_props, $$inline: true });
    	const card5_spread_levels = [/*teachYourself*/ ctx[5]];
    	let card5_props = {};

    	for (let i = 0; i < card5_spread_levels.length; i += 1) {
    		card5_props = assign(card5_props, card5_spread_levels[i]);
    	}

    	card5 = new Card({ props: card5_props, $$inline: true });
    	form = new Form({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = space();
    			br2 = element("br");
    			t3 = space();
    			br3 = element("br");
    			t4 = space();
    			section = element("section");
    			div0 = element("div");
    			h3 = element("h3");
    			h3.textContent = "About Us";
    			t6 = space();
    			p0 = element("p");
    			p0.textContent = "How to Survive CS@WPI is a set of resources for WPI students to enhance the courseload and work being done as a Computer Science Student.";
    			t8 = space();
    			p1 = element("p");
    			p1.textContent = "This information was crowd sourced from Computer Science Students from an array of the higher level CS Courses.";
    			t10 = space();
    			p2 = element("p");
    			p2.textContent = "Explore and see what there is to offer!";
    			t12 = space();
    			p3 = element("p");
    			p3.textContent = "If we are missing something, feel free to suggest your own resource below.";
    			t14 = space();
    			br4 = element("br");
    			t15 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Latest";
    			t17 = space();
    			create_component(card0.$$.fragment);
    			t18 = space();
    			create_component(card1.$$.fragment);
    			t19 = space();
    			create_component(card2.$$.fragment);
    			t20 = space();
    			div2 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Top";
    			t22 = space();
    			create_component(card3.$$.fragment);
    			t23 = space();
    			create_component(card4.$$.fragment);
    			t24 = space();
    			create_component(card5.$$.fragment);
    			t25 = space();
    			div3 = element("div");
    			create_component(form.$$.fragment);
    			t26 = space();
    			br5 = element("br");
    			t27 = space();
    			br6 = element("br");
    			t28 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file$6, 58, 1, 1774);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1");
    			add_location(meta1, file$6, 59, 8, 1805);
    			document.title = "How to Survive CS@WPI";
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css");
    			add_location(link0, file$6, 61, 8, 1927);
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://cdn-icons-png.flaticon.com/512/5766/5766858.png");
    			add_location(link1, file$6, 62, 8, 2025);
    			add_location(br0, file$6, 66, 0, 2175);
    			add_location(br1, file$6, 67, 0, 2180);
    			add_location(br2, file$6, 69, 0, 2225);
    			add_location(br3, file$6, 70, 0, 2230);
    			attr_dev(h3, "class", "title is-3 has-text-centered");
    			add_location(h3, file$6, 74, 2, 2346);
    			add_location(p0, file$6, 75, 2, 2403);
    			add_location(p1, file$6, 76, 2, 2550);
    			add_location(p2, file$6, 77, 2, 2672);
    			add_location(p3, file$6, 78, 2, 2721);
    			attr_dev(div0, "class", "hero-body has-text-centered");
    			add_location(div0, file$6, 73, 1, 2302);
    			attr_dev(section, "class", "hero is-info");
    			attr_dev(section, "id", "body_hero");
    			add_location(section, file$6, 72, 0, 2255);
    			add_location(br4, file$6, 81, 0, 2822);
    			attr_dev(h10, "class", "title is-2 has-text-centered");
    			add_location(h10, file$6, 86, 3, 2995);
    			attr_dev(div1, "class", "column");
    			attr_dev(div1, "id", "latest_cards");
    			add_location(div1, file$6, 85, 2, 2953);
    			attr_dev(h11, "class", "title is-2 has-text-centered");
    			add_location(h11, file$6, 92, 3, 3176);
    			attr_dev(div2, "class", "column");
    			attr_dev(div2, "id", "top_cards");
    			add_location(div2, file$6, 91, 2, 3137);
    			attr_dev(div3, "class", "column has-background-primary");
    			attr_dev(div3, "id", "submit_resource");
    			add_location(div3, file$6, 97, 2, 3325);
    			attr_dev(div4, "class", "columns is-vcentered is desktop");
    			add_location(div4, file$6, 84, 1, 2905);
    			attr_dev(div5, "class", "container");
    			attr_dev(div5, "id", "home_cards");
    			add_location(div5, file$6, 83, 0, 2864);
    			add_location(br5, file$6, 102, 0, 3475);
    			add_location(br6, file$6, 103, 0, 3480);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h3);
    			append_dev(div0, t6);
    			append_dev(div0, p0);
    			append_dev(div0, t8);
    			append_dev(div0, p1);
    			append_dev(div0, t10);
    			append_dev(div0, p2);
    			append_dev(div0, t12);
    			append_dev(div0, p3);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, h10);
    			append_dev(div1, t17);
    			mount_component(card0, div1, null);
    			append_dev(div1, t18);
    			mount_component(card1, div1, null);
    			append_dev(div1, t19);
    			mount_component(card2, div1, null);
    			append_dev(div4, t20);
    			append_dev(div4, div2);
    			append_dev(div2, h11);
    			append_dev(div2, t22);
    			mount_component(card3, div2, null);
    			append_dev(div2, t23);
    			mount_component(card4, div2, null);
    			append_dev(div2, t24);
    			mount_component(card5, div2, null);
    			append_dev(div4, t25);
    			append_dev(div4, div3);
    			mount_component(form, div3, null);
    			insert_dev(target, t26, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t27, anchor);
    			insert_dev(target, br6, anchor);
    			insert_dev(target, t28, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card0_changes = (dirty & /*cyberChef*/ 1)
    			? get_spread_update(card0_spread_levels, [get_spread_object(/*cyberChef*/ ctx[0])])
    			: {};

    			card0.$set(card0_changes);

    			const card1_changes = (dirty & /*sqlZoo*/ 2)
    			? get_spread_update(card1_spread_levels, [get_spread_object(/*sqlZoo*/ ctx[1])])
    			: {};

    			card1.$set(card1_changes);

    			const card2_changes = (dirty & /*discreteMath*/ 4)
    			? get_spread_update(card2_spread_levels, [get_spread_object(/*discreteMath*/ ctx[2])])
    			: {};

    			card2.$set(card2_changes);

    			const card3_changes = (dirty & /*hciBibs*/ 8)
    			? get_spread_update(card3_spread_levels, [get_spread_object(/*hciBibs*/ ctx[3])])
    			: {};

    			card3.$set(card3_changes);

    			const card4_changes = (dirty & /*cyberAwareness*/ 16)
    			? get_spread_update(card4_spread_levels, [get_spread_object(/*cyberAwareness*/ ctx[4])])
    			: {};

    			card4.$set(card4_changes);

    			const card5_changes = (dirty & /*teachYourself*/ 32)
    			? get_spread_update(card5_spread_levels, [get_spread_object(/*teachYourself*/ ctx[5])])
    			: {};

    			card5.$set(card5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card0.$$.fragment, local);
    			transition_in(card1.$$.fragment, local);
    			transition_in(card2.$$.fragment, local);
    			transition_in(card3.$$.fragment, local);
    			transition_in(card4.$$.fragment, local);
    			transition_in(card5.$$.fragment, local);
    			transition_in(form.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card0.$$.fragment, local);
    			transition_out(card1.$$.fragment, local);
    			transition_out(card2.$$.fragment, local);
    			transition_out(card3.$$.fragment, local);
    			transition_out(card4.$$.fragment, local);
    			transition_out(card5.$$.fragment, local);
    			transition_out(form.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div5);
    			destroy_component(card0);
    			destroy_component(card1);
    			destroy_component(card2);
    			destroy_component(card3);
    			destroy_component(card4);
    			destroy_component(card5);
    			destroy_component(form);
    			if (detaching) detach_dev(t26);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t27);
    			if (detaching) detach_dev(br6);
    			if (detaching) detach_dev(t28);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Src', slots, []);

    	var cyberChef = {
    		title: 'CyberChef',
    		desc: 'CyberChef is a simple, intuitive web app for carrying out all manner of \"cyber\" operations within a web browser.',
    		link: 'https://gchq.github.io/CyberChef/',
    		tag: 'cybersecurity'
    	};

    	const sqlZoo = {
    		title: 'SQLZoo',
    		desc: 'Wiki-based interactive tutorials to learn SQL.',
    		link: 'https://sqlzoo.net/wiki/SQL_Tutorial',
    		tag: 'fullstack'
    	};

    	const discreteMath = {
    		title: 'DiscreteMath.org',
    		desc: 'An open content source to learn discrete math. ',
    		link: 'https://discretemath.org/',
    		tag: 'theory'
    	};

    	const hciBibs = {
    		title: 'HCI Bib',
    		desc: 'A webpage of useful HCI resources (albeit a bit outdated). ',
    		link: 'http://hcibib.org/',
    		tag: 'fullstack'
    	};

    	const cyberAwareness = {
    		title: 'Cyber Awareness Challenge',
    		desc: 'Training used by Department of Defense workers to be aware of common cyber security threats.',
    		link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
    		tag: 'cybersecurity'
    	};

    	const teachYourself = {
    		title: 'Teach Yourself CS',
    		desc: 'Massive guide to learn lots of underlying knowlegdge of Computer Science.',
    		link: 'https://teachyourselfcs.com/',
    		tag: 'theory'
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Src> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Form,
    		Footer,
    		Card,
    		cyberChef,
    		sqlZoo,
    		discreteMath,
    		hciBibs,
    		cyberAwareness,
    		teachYourself
    	});

    	$$self.$inject_state = $$props => {
    		if ('cyberChef' in $$props) $$invalidate(0, cyberChef = $$props.cyberChef);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cyberChef, sqlZoo, discreteMath, hciBibs, cyberAwareness, teachYourself];
    }

    class Src extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Src",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/fullstack.svelte generated by Svelte v3.51.0 */
    const file$5 = "src/fullstack.svelte";

    function create_fragment$5(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let br2;
    	let t3;
    	let section;
    	let div0;
    	let h2;
    	let t5;
    	let p0;
    	let t7;
    	let p1;
    	let t8;
    	let a0;
    	let t10;
    	let a1;
    	let t12;
    	let t13;
    	let br3;
    	let t14;
    	let div5;
    	let div4;
    	let div1;
    	let h10;
    	let t16;
    	let card0;
    	let t17;
    	let card1;
    	let t18;
    	let card2;
    	let t19;
    	let div2;
    	let h11;
    	let t21;
    	let card3;
    	let t22;
    	let card4;
    	let t23;
    	let card5;
    	let t24;
    	let div3;
    	let h12;
    	let t26;
    	let card6;
    	let t27;
    	let card7;
    	let t28;
    	let card8;
    	let t29;
    	let br4;
    	let t30;
    	let br5;
    	let t31;
    	let footer;
    	let card0_levels = [/*material*/ ctx[2]];
    	let card0_data = {};

    	for (let i = 0; i < card0_levels.length; i += 1) {
    		card0_data = assign(card0_data, card0_levels[i]);
    	}

    	let card1_levels = [/*hciBibs*/ ctx[1]];
    	let card1_data = {};

    	for (let i = 0; i < card1_levels.length; i += 1) {
    		card1_data = assign(card1_data, card1_levels[i]);
    	}

    	let card2_levels = [/*webTools*/ ctx[3]];
    	let card2_data = {};

    	for (let i = 0; i < card2_levels.length; i += 1) {
    		card2_data = assign(card2_data, card2_levels[i]);
    	}

    	let card3_levels = [/*codeAbbey*/ ctx[5]];
    	let card3_data = {};

    	for (let i = 0; i < card3_levels.length; i += 1) {
    		card3_data = assign(card3_data, card3_levels[i]);
    	}

    	let card4_levels = [/*runrb*/ ctx[4]];
    	let card4_data = {};

    	for (let i = 0; i < card4_levels.length; i += 1) {
    		card4_data = assign(card4_data, card4_levels[i]);
    	}

    	let card5_levels = [/*sqlZoo*/ ctx[0]];
    	let card5_data = {};

    	for (let i = 0; i < card5_levels.length; i += 1) {
    		card5_data = assign(card5_data, card5_levels[i]);
    	}

    	let card6_levels = [/*reactLib*/ ctx[6]];
    	let card6_data = {};

    	for (let i = 0; i < card6_levels.length; i += 1) {
    		card6_data = assign(card6_data, card6_levels[i]);
    	}

    	let card7_levels = [/*svelteTut*/ ctx[7]];
    	let card7_data = {};

    	for (let i = 0; i < card7_levels.length; i += 1) {
    		card7_data = assign(card7_data, card7_levels[i]);
    	}

    	let card8_levels = [/*w3Schools*/ ctx[8]];
    	let card8_data = {};

    	for (let i = 0; i < card8_levels.length; i += 1) {
    		card8_data = assign(card8_data, card8_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = space();
    			br2 = element("br");
    			t3 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Full-Stack and Design";
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Fullstack development is a useful skill for developers to have. Fullstack development is the ability to work on both the front end and back end of applications.";
    			t7 = space();
    			p1 = element("p");
    			t8 = text("WPI offers a number of courses focused on fullstack. Some of the offerings include ");
    			a0 = element("a");
    			a0.textContent = "CS 3733";
    			t10 = text(" and ");
    			a1 = element("a");
    			a1.textContent = "CS 3041";
    			t12 = text(".");
    			t13 = space();
    			br3 = element("br");
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			h10 = element("h1");
    			h10.textContent = "Front End";
    			t16 = space();
    			card0 = element("card");
    			t17 = space();
    			card1 = element("card");
    			t18 = space();
    			card2 = element("card");
    			t19 = space();
    			div2 = element("div");
    			h11 = element("h1");
    			h11.textContent = "Back End";
    			t21 = space();
    			card3 = element("card");
    			t22 = space();
    			card4 = element("card");
    			t23 = space();
    			card5 = element("card");
    			t24 = space();
    			div3 = element("div");
    			h12 = element("h1");
    			h12.textContent = "Full Stack";
    			t26 = space();
    			card6 = element("card");
    			t27 = space();
    			card7 = element("card");
    			t28 = space();
    			card8 = element("card");
    			t29 = space();
    			br4 = element("br");
    			t30 = space();
    			br5 = element("br");
    			t31 = space();
    			footer = element("footer");
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file$5, 91, 1, 2839);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1");
    			add_location(meta1, file$5, 92, 8, 2870);
    			document.title = "How to Survive CS@WPI";
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css");
    			add_location(link0, file$5, 94, 8, 2992);
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://cdn-icons-png.flaticon.com/512/5766/5766858.png");
    			add_location(link1, file$5, 95, 8, 3090);
    			add_location(br0, file$5, 99, 0, 3243);
    			add_location(br1, file$5, 100, 0, 3248);
    			add_location(br2, file$5, 101, 0, 3253);
    			attr_dev(h2, "class", "title is-2 has-text-centered");
    			add_location(h2, file$5, 105, 8, 3366);
    			add_location(p0, file$5, 106, 8, 3442);
    			attr_dev(a0, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3733");
    			add_location(a0, file$5, 107, 94, 3704);
    			attr_dev(a1, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3041");
    			add_location(a1, file$5, 107, 218, 3828);
    			add_location(p1, file$5, 107, 8, 3618);
    			attr_dev(div0, "class", "hero-body");
    			add_location(div0, file$5, 104, 4, 3334);
    			attr_dev(section, "class", "hero is-info");
    			attr_dev(section, "id", "full_stack_hero");
    			add_location(section, file$5, 103, 0, 3278);
    			add_location(br3, file$5, 110, 0, 3977);
    			attr_dev(h10, "class", "title is-2 has-text-centered");
    			add_location(h10, file$5, 114, 12, 4118);
    			set_attributes(card0, card0_data);
    			add_location(card0, file$5, 115, 3, 4177);
    			set_attributes(card1, card1_data);
    			add_location(card1, file$5, 116, 3, 4202);
    			set_attributes(card2, card2_data);
    			add_location(card2, file$5, 117, 3, 4226);
    			attr_dev(div1, "class", "column");
    			attr_dev(div1, "id", "front_end_cards");
    			add_location(div1, file$5, 113, 8, 4064);
    			attr_dev(h11, "class", "title is-2 has-text-centered");
    			add_location(h11, file$5, 120, 3, 4303);
    			set_attributes(card3, card3_data);
    			add_location(card3, file$5, 121, 3, 4361);
    			set_attributes(card4, card4_data);
    			add_location(card4, file$5, 122, 3, 4388);
    			set_attributes(card5, card5_data);
    			add_location(card5, file$5, 123, 3, 4411);
    			attr_dev(div2, "class", "column");
    			attr_dev(div2, "id", "back_end_cards");
    			add_location(div2, file$5, 119, 2, 4259);
    			attr_dev(h12, "class", "title is-2 has-text-centered");
    			add_location(h12, file$5, 126, 6, 4491);
    			set_attributes(card6, card6_data);
    			add_location(card6, file$5, 127, 6, 4554);
    			set_attributes(card7, card7_data);
    			add_location(card7, file$5, 128, 3, 4580);
    			set_attributes(card8, card8_data);
    			add_location(card8, file$5, 129, 3, 4607);
    			attr_dev(div3, "class", "column");
    			attr_dev(div3, "id", "full_stack_cards");
    			add_location(div3, file$5, 125, 2, 4442);
    			attr_dev(div4, "class", "columns is-vcentered is desktop");
    			add_location(div4, file$5, 112, 4, 4010);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$5, 111, 0, 3982);
    			add_location(br4, file$5, 133, 0, 4655);
    			add_location(br5, file$5, 134, 0, 4660);
    			add_location(footer, file$5, 135, 0, 4665);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(div0, t7);
    			append_dev(div0, p1);
    			append_dev(p1, t8);
    			append_dev(p1, a0);
    			append_dev(p1, t10);
    			append_dev(p1, a1);
    			append_dev(p1, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div1, h10);
    			append_dev(div1, t16);
    			append_dev(div1, card0);
    			append_dev(div1, t17);
    			append_dev(div1, card1);
    			append_dev(div1, t18);
    			append_dev(div1, card2);
    			append_dev(div4, t19);
    			append_dev(div4, div2);
    			append_dev(div2, h11);
    			append_dev(div2, t21);
    			append_dev(div2, card3);
    			append_dev(div2, t22);
    			append_dev(div2, card4);
    			append_dev(div2, t23);
    			append_dev(div2, card5);
    			append_dev(div4, t24);
    			append_dev(div4, div3);
    			append_dev(div3, h12);
    			append_dev(div3, t26);
    			append_dev(div3, card6);
    			append_dev(div3, t27);
    			append_dev(div3, card7);
    			append_dev(div3, t28);
    			append_dev(div3, card8);
    			insert_dev(target, t29, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t30, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t31, anchor);
    			insert_dev(target, footer, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(card0, card0_data = get_spread_update(card0_levels, [/*material*/ ctx[2]]));
    			set_attributes(card1, card1_data = get_spread_update(card1_levels, [/*hciBibs*/ ctx[1]]));
    			set_attributes(card2, card2_data = get_spread_update(card2_levels, [/*webTools*/ ctx[3]]));
    			set_attributes(card3, card3_data = get_spread_update(card3_levels, [/*codeAbbey*/ ctx[5]]));
    			set_attributes(card4, card4_data = get_spread_update(card4_levels, [/*runrb*/ ctx[4]]));
    			set_attributes(card5, card5_data = get_spread_update(card5_levels, [/*sqlZoo*/ ctx[0]]));
    			set_attributes(card6, card6_data = get_spread_update(card6_levels, [/*reactLib*/ ctx[6]]));
    			set_attributes(card7, card7_data = get_spread_update(card7_levels, [/*svelteTut*/ ctx[7]]));
    			set_attributes(card8, card8_data = get_spread_update(card8_levels, [/*w3Schools*/ ctx[8]]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t29);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t30);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t31);
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Fullstack', slots, []);

    	const sqlZoo = {
    		title: 'SQLZoo',
    		desc: 'Wiki-based interactive tutorials to learn SQL.',
    		link: 'https://sqlzoo.net/wiki/SQL_Tutorial',
    		tag: 'fullstack'
    	};

    	const hciBibs = {
    		title: 'HCI Bib',
    		desc: 'A webpage of useful HCI resources (albeit a bit outdated). ',
    		link: 'http://hcibib.org/',
    		tag: 'fullstack'
    	};

    	const material = {
    		title: "Material.io",
    		desc: "Best practices for building Android Apps.",
    		link: "https://material.io/design",
    		tag: "fullstack"
    	};

    	const webTools = {
    		title: "Accessible Web Tools",
    		desc: "A Mastersheet of many Accessible web components.",
    		link: "https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/",
    		tag: "fullstack"
    	};

    	const responsiveDesign = {
    		title: "Responsive Design",
    		desc: "Helpful step-by-step guides to learn Responsive Design.",
    		link: "https://web.dev/learn/design/",
    		tag: "fullstack"
    	};

    	const runrb = {
    		title: "runrb.io",
    		desc: "Online development space to create, run, and test Ruby on Rails code.",
    		link: "https://runrb.io/",
    		tag: "fullstack"
    	};

    	const codeAbbey = {
    		title: "CodeAbbey",
    		desc: "Test out your Java skills with a wide variety of Java problems to solve.",
    		link: "https://www.codeabbey.com/index/task_list",
    		tag: "fullstack"
    	};

    	const phpRight = {
    		title: "PHP the Right Way",
    		desc: "A frequently updated guide to learn and write PHP code.",
    		link: "https://phptherightway.com/",
    		tag: "fullstack"
    	};

    	const devTerminal = {
    		title: "Front-End Dev's Guide to Terminal",
    		desc: "A user friendly guide to using Terminal commands.",
    		link: "https://www.joshwcomeau.com/javascript/terminal-for-js-devs/",
    		tag: "fullstack"
    	};

    	const reactLib = {
    		title: "React Libraries",
    		desc: "13 React Libraries that are helpful to know.",
    		link: "https://cult.honeypot.io/reads/react-libraries-2022/",
    		tag: "fullstack"
    	};

    	const svelteTut = {
    		title: "Svelte Tutorials",
    		desc: "Tutorials from the official Svelte documentation.",
    		link: "https://svelte.dev/tutorial/basics",
    		tag: "fullstack"
    	};

    	const w3Schools = {
    		title: "W3 Schools",
    		desc: "A website with documentation and tutorials for almost all of the most popular web development languages and Tools.",
    		link: "https://www.w3schools.com/",
    		tag: "fullstack"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Fullstack> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Footer,
    		Card,
    		sqlZoo,
    		hciBibs,
    		material,
    		webTools,
    		responsiveDesign,
    		runrb,
    		codeAbbey,
    		phpRight,
    		devTerminal,
    		reactLib,
    		svelteTut,
    		w3Schools
    	});

    	return [
    		sqlZoo,
    		hciBibs,
    		material,
    		webTools,
    		runrb,
    		codeAbbey,
    		reactLib,
    		svelteTut,
    		w3Schools
    	];
    }

    class Fullstack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Fullstack",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/cybersecurity.svelte generated by Svelte v3.51.0 */
    const file$4 = "src/cybersecurity.svelte";

    function create_fragment$4(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let br2;
    	let t3;
    	let section;
    	let div0;
    	let h2;
    	let t5;
    	let p0;
    	let t7;
    	let p1;
    	let t8;
    	let a0;
    	let t10;
    	let a1;
    	let t12;
    	let t13;
    	let br3;
    	let t14;
    	let div5;
    	let div4;
    	let div1;
    	let card0;
    	let t15;
    	let card1;
    	let t16;
    	let div2;
    	let card2;
    	let t17;
    	let card3;
    	let t18;
    	let div3;
    	let card4;
    	let t19;
    	let card5;
    	let t20;
    	let br4;
    	let t21;
    	let br5;
    	let t22;
    	let footer;
    	let current;
    	const card0_spread_levels = [/*cyberChef*/ ctx[0]];
    	let card0_props = {};

    	for (let i = 0; i < card0_spread_levels.length; i += 1) {
    		card0_props = assign(card0_props, card0_spread_levels[i]);
    	}

    	card0 = new Card({ props: card0_props, $$inline: true });
    	const card1_spread_levels = [/*nationalCyber*/ ctx[2]];
    	let card1_props = {};

    	for (let i = 0; i < card1_spread_levels.length; i += 1) {
    		card1_props = assign(card1_props, card1_spread_levels[i]);
    	}

    	card1 = new Card({ props: card1_props, $$inline: true });
    	const card2_spread_levels = [/*cyberAwareness*/ ctx[1]];
    	let card2_props = {};

    	for (let i = 0; i < card2_spread_levels.length; i += 1) {
    		card2_props = assign(card2_props, card2_spread_levels[i]);
    	}

    	card2 = new Card({ props: card2_props, $$inline: true });
    	const card3_spread_levels = [/*cyberGames*/ ctx[3]];
    	let card3_props = {};

    	for (let i = 0; i < card3_spread_levels.length; i += 1) {
    		card3_props = assign(card3_props, card3_spread_levels[i]);
    	}

    	card3 = new Card({ props: card3_props, $$inline: true });
    	const card4_spread_levels = [/*hacker101*/ ctx[4]];
    	let card4_props = {};

    	for (let i = 0; i < card4_spread_levels.length; i += 1) {
    		card4_props = assign(card4_props, card4_spread_levels[i]);
    	}

    	card4 = new Card({ props: card4_props, $$inline: true });
    	const card5_spread_levels = [/*tryHackMe*/ ctx[5]];
    	let card5_props = {};

    	for (let i = 0; i < card5_spread_levels.length; i += 1) {
    		card5_props = assign(card5_props, card5_spread_levels[i]);
    	}

    	card5 = new Card({ props: card5_props, $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = space();
    			br2 = element("br");
    			t3 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Cybersecurity";
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Cybersecurity is the study within Computer Science on how to keep personal data and other sensetive infomation safe. It is a specialization that is increasingly important in the changing world.";
    			t7 = space();
    			p1 = element("p");
    			t8 = text("WPI offers a number of courses focused on Cybersecurity. Some of the offerings include ");
    			a0 = element("a");
    			a0.textContent = "CS 4401";
    			t10 = text(" and ");
    			a1 = element("a");
    			a1.textContent = "CS 4801";
    			t12 = text(".");
    			t13 = space();
    			br3 = element("br");
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			create_component(card0.$$.fragment);
    			t15 = space();
    			create_component(card1.$$.fragment);
    			t16 = space();
    			div2 = element("div");
    			create_component(card2.$$.fragment);
    			t17 = space();
    			create_component(card3.$$.fragment);
    			t18 = space();
    			div3 = element("div");
    			create_component(card4.$$.fragment);
    			t19 = space();
    			create_component(card5.$$.fragment);
    			t20 = space();
    			br4 = element("br");
    			t21 = space();
    			br5 = element("br");
    			t22 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file$4, 49, 1, 1708);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1");
    			add_location(meta1, file$4, 50, 8, 1739);
    			document.title = "How to Survive CS@WPI";
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css");
    			add_location(link0, file$4, 52, 8, 1861);
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://cdn-icons-png.flaticon.com/512/5766/5766858.png");
    			add_location(link1, file$4, 53, 8, 1959);
    			add_location(br0, file$4, 57, 0, 2111);
    			add_location(br1, file$4, 58, 0, 2116);
    			add_location(br2, file$4, 59, 0, 2121);
    			attr_dev(h2, "class", "title is-2 has-text-centered");
    			add_location(h2, file$4, 63, 8, 2229);
    			add_location(p0, file$4, 64, 8, 2297);
    			attr_dev(a0, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4401");
    			add_location(a0, file$4, 65, 98, 2596);
    			attr_dev(a1, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4801");
    			add_location(a1, file$4, 65, 222, 2720);
    			add_location(p1, file$4, 65, 8, 2506);
    			attr_dev(div0, "class", "hero-body");
    			add_location(div0, file$4, 62, 4, 2197);
    			attr_dev(section, "class", "hero is-info");
    			attr_dev(section, "id", "cyber_hero");
    			add_location(section, file$4, 61, 0, 2146);
    			add_location(br3, file$4, 68, 0, 2867);
    			attr_dev(div1, "class", "column");
    			attr_dev(div1, "id", "theory_col1");
    			add_location(div1, file$4, 71, 8, 2954);
    			attr_dev(div2, "class", "column");
    			attr_dev(div2, "id", "theory_col2");
    			add_location(div2, file$4, 75, 2, 3059);
    			attr_dev(div3, "class", "column");
    			attr_dev(div3, "id", "theory_col3");
    			add_location(div3, file$4, 79, 2, 3168);
    			attr_dev(div4, "class", "columns is-vcentered is desktop");
    			add_location(div4, file$4, 70, 4, 2900);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$4, 69, 0, 2872);
    			add_location(br4, file$4, 85, 0, 3293);
    			add_location(br5, file$4, 86, 0, 3298);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(div0, t7);
    			append_dev(div0, p1);
    			append_dev(p1, t8);
    			append_dev(p1, a0);
    			append_dev(p1, t10);
    			append_dev(p1, a1);
    			append_dev(p1, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			mount_component(card0, div1, null);
    			append_dev(div1, t15);
    			mount_component(card1, div1, null);
    			append_dev(div4, t16);
    			append_dev(div4, div2);
    			mount_component(card2, div2, null);
    			append_dev(div2, t17);
    			mount_component(card3, div2, null);
    			append_dev(div4, t18);
    			append_dev(div4, div3);
    			mount_component(card4, div3, null);
    			append_dev(div3, t19);
    			mount_component(card5, div3, null);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t22, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card0_changes = (dirty & /*cyberChef*/ 1)
    			? get_spread_update(card0_spread_levels, [get_spread_object(/*cyberChef*/ ctx[0])])
    			: {};

    			card0.$set(card0_changes);

    			const card1_changes = (dirty & /*nationalCyber*/ 4)
    			? get_spread_update(card1_spread_levels, [get_spread_object(/*nationalCyber*/ ctx[2])])
    			: {};

    			card1.$set(card1_changes);

    			const card2_changes = (dirty & /*cyberAwareness*/ 2)
    			? get_spread_update(card2_spread_levels, [get_spread_object(/*cyberAwareness*/ ctx[1])])
    			: {};

    			card2.$set(card2_changes);

    			const card3_changes = (dirty & /*cyberGames*/ 8)
    			? get_spread_update(card3_spread_levels, [get_spread_object(/*cyberGames*/ ctx[3])])
    			: {};

    			card3.$set(card3_changes);

    			const card4_changes = (dirty & /*hacker101*/ 16)
    			? get_spread_update(card4_spread_levels, [get_spread_object(/*hacker101*/ ctx[4])])
    			: {};

    			card4.$set(card4_changes);

    			const card5_changes = (dirty & /*tryHackMe*/ 32)
    			? get_spread_update(card5_spread_levels, [get_spread_object(/*tryHackMe*/ ctx[5])])
    			: {};

    			card5.$set(card5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card0.$$.fragment, local);
    			transition_in(card1.$$.fragment, local);
    			transition_in(card2.$$.fragment, local);
    			transition_in(card3.$$.fragment, local);
    			transition_in(card4.$$.fragment, local);
    			transition_in(card5.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card0.$$.fragment, local);
    			transition_out(card1.$$.fragment, local);
    			transition_out(card2.$$.fragment, local);
    			transition_out(card3.$$.fragment, local);
    			transition_out(card4.$$.fragment, local);
    			transition_out(card5.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div5);
    			destroy_component(card0);
    			destroy_component(card1);
    			destroy_component(card2);
    			destroy_component(card3);
    			destroy_component(card4);
    			destroy_component(card5);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t22);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cybersecurity', slots, []);

    	var cyberChef = {
    		title: 'CyberChef',
    		desc: 'CyberChef is a simple, intuitive web app for carrying out all manner of \"cyber\" operations within a web browser.',
    		link: 'https://gchq.github.io/CyberChef/',
    		tag: 'cybersecurity'
    	};

    	const cyberAwareness = {
    		title: 'Cyber Awareness Challenge',
    		desc: 'Training used by Department of Defense workers to be aware of common cyber security threats.',
    		link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
    		tag: 'cybersecurity'
    	};

    	const nationalCyber = {
    		title: "The National Cyber League",
    		desc: "Join a community for immersive cyber challenges",
    		link: "https://nationalcyberleague.org/",
    		tag: "cybersecurity"
    	};

    	const cyberGames = {
    		title: "Cybersecurity Games",
    		desc: "A set of games from the University of Texas at Austin focused on testing and sharpening cybersecurity skills.",
    		link: "https://it.tamu.edu/security/cybersecurity-games/index.php",
    		tag: "cybersecurity"
    	};

    	const hacker101 = {
    		title: "Hacker101",
    		desc: "Free online classes covering web security.",
    		link: "https://www.hacker101.com/",
    		tag: "cybersecurity"
    	};

    	const tryHackMe = {
    		title: "TryHackMe",
    		desc: "Learning cybersecurity in small, byte-sized, gamified lessons.",
    		link: "https://tryhackme.com/",
    		tag: "cybersecurity"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cybersecurity> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Footer,
    		Card,
    		cyberChef,
    		cyberAwareness,
    		nationalCyber,
    		cyberGames,
    		hacker101,
    		tryHackMe
    	});

    	$$self.$inject_state = $$props => {
    		if ('cyberChef' in $$props) $$invalidate(0, cyberChef = $$props.cyberChef);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cyberChef, cyberAwareness, nationalCyber, cyberGames, hacker101, tryHackMe];
    }

    class Cybersecurity extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cybersecurity",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/theory.svelte generated by Svelte v3.51.0 */
    const file$3 = "src/theory.svelte";

    function create_fragment$3(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let t0;
    	let br0;
    	let t1;
    	let br1;
    	let t2;
    	let br2;
    	let t3;
    	let section;
    	let div0;
    	let h2;
    	let t5;
    	let p0;
    	let t7;
    	let p1;
    	let t8;
    	let a0;
    	let t10;
    	let a1;
    	let t12;
    	let t13;
    	let br3;
    	let t14;
    	let div5;
    	let div4;
    	let div1;
    	let card0;
    	let t15;
    	let card1;
    	let t16;
    	let div2;
    	let card2;
    	let t17;
    	let card3;
    	let t18;
    	let div3;
    	let card4;
    	let t19;
    	let card5;
    	let t20;
    	let br4;
    	let t21;
    	let br5;
    	let t22;
    	let footer;
    	let current;
    	const card0_spread_levels = [/*teachYourself*/ ctx[1]];
    	let card0_props = {};

    	for (let i = 0; i < card0_spread_levels.length; i += 1) {
    		card0_props = assign(card0_props, card0_spread_levels[i]);
    	}

    	card0 = new Card({ props: card0_props, $$inline: true });
    	const card1_spread_levels = [/*visualgo*/ ctx[5]];
    	let card1_props = {};

    	for (let i = 0; i < card1_spread_levels.length; i += 1) {
    		card1_props = assign(card1_props, card1_spread_levels[i]);
    	}

    	card1 = new Card({ props: card1_props, $$inline: true });
    	const card2_spread_levels = [/*theoriesInComp*/ ctx[3]];
    	let card2_props = {};

    	for (let i = 0; i < card2_spread_levels.length; i += 1) {
    		card2_props = assign(card2_props, card2_spread_levels[i]);
    	}

    	card2 = new Card({ props: card2_props, $$inline: true });
    	const card3_spread_levels = [/*theoryOfComp*/ ctx[2]];
    	let card3_props = {};

    	for (let i = 0; i < card3_spread_levels.length; i += 1) {
    		card3_props = assign(card3_props, card3_spread_levels[i]);
    	}

    	card3 = new Card({ props: card3_props, $$inline: true });
    	const card4_spread_levels = [/*discreteMath*/ ctx[0]];
    	let card4_props = {};

    	for (let i = 0; i < card4_spread_levels.length; i += 1) {
    		card4_props = assign(card4_props, card4_spread_levels[i]);
    	}

    	card4 = new Card({ props: card4_props, $$inline: true });
    	const card5_spread_levels = [/*introDiscrete*/ ctx[4]];
    	let card5_props = {};

    	for (let i = 0; i < card5_spread_levels.length; i += 1) {
    		card5_props = assign(card5_props, card5_spread_levels[i]);
    	}

    	card5 = new Card({ props: card5_props, $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			br1 = element("br");
    			t2 = space();
    			br2 = element("br");
    			t3 = space();
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Theory";
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Computational Theory is a large background element of all Computer Science. It is good to have a general base of computational theory to understand the underlying working of computers.";
    			t7 = space();
    			p1 = element("p");
    			t8 = text("WPI offers a number of courses focused on Theory. Some of the offerings include ");
    			a0 = element("a");
    			a0.textContent = "CS 3133";
    			t10 = text(" and ");
    			a1 = element("a");
    			a1.textContent = "CS 4123";
    			t12 = text(".");
    			t13 = space();
    			br3 = element("br");
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div1 = element("div");
    			create_component(card0.$$.fragment);
    			t15 = space();
    			create_component(card1.$$.fragment);
    			t16 = space();
    			div2 = element("div");
    			create_component(card2.$$.fragment);
    			t17 = space();
    			create_component(card3.$$.fragment);
    			t18 = space();
    			div3 = element("div");
    			create_component(card4.$$.fragment);
    			t19 = space();
    			create_component(card5.$$.fragment);
    			t20 = space();
    			br4 = element("br");
    			t21 = space();
    			br5 = element("br");
    			t22 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file$3, 49, 1, 1665);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1");
    			add_location(meta1, file$3, 50, 8, 1696);
    			document.title = "How to Survive CS@WPI";
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css");
    			add_location(link0, file$3, 52, 8, 1818);
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://cdn-icons-png.flaticon.com/512/5766/5766858.png");
    			add_location(link1, file$3, 53, 8, 1916);
    			add_location(br0, file$3, 57, 0, 2066);
    			add_location(br1, file$3, 58, 0, 2071);
    			add_location(br2, file$3, 59, 0, 2076);
    			attr_dev(h2, "class", "title is-2 has-text-centered");
    			add_location(h2, file$3, 63, 8, 2185);
    			add_location(p0, file$3, 64, 8, 2246);
    			attr_dev(a0, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3133");
    			add_location(a0, file$3, 65, 91, 2529);
    			attr_dev(a1, "href", "https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4123");
    			add_location(a1, file$3, 65, 215, 2653);
    			add_location(p1, file$3, 65, 8, 2446);
    			attr_dev(div0, "class", "hero-body");
    			add_location(div0, file$3, 62, 4, 2153);
    			attr_dev(section, "class", "hero is-info");
    			attr_dev(section, "id", "theory_hero");
    			add_location(section, file$3, 61, 0, 2101);
    			add_location(br3, file$3, 68, 0, 2802);
    			attr_dev(div1, "class", "column");
    			attr_dev(div1, "id", "theory_col1");
    			add_location(div1, file$3, 71, 8, 2889);
    			attr_dev(div2, "class", "column");
    			attr_dev(div2, "id", "theory_col2");
    			add_location(div2, file$3, 75, 2, 2993);
    			attr_dev(div3, "class", "column");
    			attr_dev(div3, "id", "theory_col3");
    			add_location(div3, file$3, 79, 2, 3104);
    			attr_dev(div4, "class", "columns is-vcentered is desktop");
    			add_location(div4, file$3, 70, 4, 2835);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$3, 69, 0, 2807);
    			add_location(br4, file$3, 85, 0, 3236);
    			add_location(br5, file$3, 86, 0, 3241);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(div0, t7);
    			append_dev(div0, p1);
    			append_dev(p1, t8);
    			append_dev(p1, a0);
    			append_dev(p1, t10);
    			append_dev(p1, a1);
    			append_dev(p1, t12);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, br3, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			mount_component(card0, div1, null);
    			append_dev(div1, t15);
    			mount_component(card1, div1, null);
    			append_dev(div4, t16);
    			append_dev(div4, div2);
    			mount_component(card2, div2, null);
    			append_dev(div2, t17);
    			mount_component(card3, div2, null);
    			append_dev(div4, t18);
    			append_dev(div4, div3);
    			mount_component(card4, div3, null);
    			append_dev(div3, t19);
    			mount_component(card5, div3, null);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, br4, anchor);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, br5, anchor);
    			insert_dev(target, t22, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const card0_changes = (dirty & /*teachYourself*/ 2)
    			? get_spread_update(card0_spread_levels, [get_spread_object(/*teachYourself*/ ctx[1])])
    			: {};

    			card0.$set(card0_changes);

    			const card1_changes = (dirty & /*visualgo*/ 32)
    			? get_spread_update(card1_spread_levels, [get_spread_object(/*visualgo*/ ctx[5])])
    			: {};

    			card1.$set(card1_changes);

    			const card2_changes = (dirty & /*theoriesInComp*/ 8)
    			? get_spread_update(card2_spread_levels, [get_spread_object(/*theoriesInComp*/ ctx[3])])
    			: {};

    			card2.$set(card2_changes);

    			const card3_changes = (dirty & /*theoryOfComp*/ 4)
    			? get_spread_update(card3_spread_levels, [get_spread_object(/*theoryOfComp*/ ctx[2])])
    			: {};

    			card3.$set(card3_changes);

    			const card4_changes = (dirty & /*discreteMath*/ 1)
    			? get_spread_update(card4_spread_levels, [get_spread_object(/*discreteMath*/ ctx[0])])
    			: {};

    			card4.$set(card4_changes);

    			const card5_changes = (dirty & /*introDiscrete*/ 16)
    			? get_spread_update(card5_spread_levels, [get_spread_object(/*introDiscrete*/ ctx[4])])
    			: {};

    			card5.$set(card5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card0.$$.fragment, local);
    			transition_in(card1.$$.fragment, local);
    			transition_in(card2.$$.fragment, local);
    			transition_in(card3.$$.fragment, local);
    			transition_in(card4.$$.fragment, local);
    			transition_in(card5.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card0.$$.fragment, local);
    			transition_out(card1.$$.fragment, local);
    			transition_out(card2.$$.fragment, local);
    			transition_out(card3.$$.fragment, local);
    			transition_out(card4.$$.fragment, local);
    			transition_out(card5.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(section);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(br3);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div5);
    			destroy_component(card0);
    			destroy_component(card1);
    			destroy_component(card2);
    			destroy_component(card3);
    			destroy_component(card4);
    			destroy_component(card5);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(br4);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(br5);
    			if (detaching) detach_dev(t22);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Theory', slots, []);

    	const discreteMath = {
    		title: 'DiscreteMath.org',
    		desc: 'An open content source to learn discrete math. ',
    		link: 'https://discretemath.org/',
    		tag: 'theory'
    	};

    	const teachYourself = {
    		title: 'Teach Yourself CS',
    		desc: 'Massive guide to learn lots of underlying knowlegdge of Computer Science.',
    		link: 'https://teachyourselfcs.com/',
    		tag: 'theory'
    	};

    	const theoryOfComp = {
    		title: "Theory of Computation",
    		desc: "MIT Opencourseware on their class, Theory of Computation, at both a graduate and undergraduate level.",
    		link: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
    		tag: "theory"
    	};

    	const theoriesInComp = {
    		title: "Theories in Computer Science",
    		desc: "A quick guide giving small explanations of the basics of computer science theory.",
    		link: "https://cs.lmu.edu/~ray/notes/cstheories/",
    		tag: "theory"
    	};

    	const introDiscrete = {
    		title: "Discrete Mathematics, An Introduction",
    		desc: "An interactive ebook introducing discrete math to beginners.",
    		link: "https://discrete.openmathbooks.org/dmoi3/",
    		tag: "theory"
    	};

    	const visualgo = {
    		title: "VisualAlgo",
    		desc: "A website with visuals and animations of many popular algorithims.",
    		link: "https://visualgo.net/en",
    		tag: "theory"
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Theory> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Footer,
    		Card,
    		discreteMath,
    		teachYourself,
    		theoryOfComp,
    		theoriesInComp,
    		introDiscrete,
    		visualgo
    	});

    	return [
    		discreteMath,
    		teachYourself,
    		theoryOfComp,
    		theoriesInComp,
    		introDiscrete,
    		visualgo
    	];
    }

    class Theory extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Theory",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/routes.svelte generated by Svelte v3.51.0 */
    const file$2 = "src/routes.svelte";

    function create_fragment$2(ctx) {
    	let router;
    	let div;
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;

    	const block = {
    		c: function create() {
    			router = element("router");
    			div = element("div");
    			route0 = element("route");
    			t0 = space();
    			route1 = element("route");
    			t1 = space();
    			route2 = element("route");
    			t2 = space();
    			route3 = element("route");
    			attr_dev(route0, "path", "fullstack");
    			attr_dev(route0, "component", Fullstack);
    			add_location(route0, file$2, 12, 4, 296);
    			attr_dev(route1, "path", "cybersecurity");
    			attr_dev(route1, "component", Cybersecurity);
    			add_location(route1, file$2, 13, 4, 351);
    			attr_dev(route2, "path", "theory");
    			attr_dev(route2, "component", theory);
    			add_location(route2, file$2, 14, 4, 414);
    			attr_dev(route3, "path", "/");
    			attr_dev(route3, "component", Src);
    			add_location(route3, file$2, 15, 4, 463);
    			add_location(div, file$2, 11, 2, 286);
    			attr_dev(router, "url", /*url*/ ctx[0]);
    			add_location(router, file$2, 10, 0, 269);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, router, anchor);
    			append_dev(router, div);
    			append_dev(div, route0);
    			append_dev(div, t0);
    			append_dev(div, route1);
    			append_dev(div, t1);
    			append_dev(div, route2);
    			append_dev(div, t2);
    			append_dev(div, route3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*url*/ 1) {
    				attr_dev(router, "url", /*url*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Routes', slots, []);
    	let { url = '' } = $$props;
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Routes> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router: svelteRouting.Router,
    		Route: svelteRouting.Route,
    		Index: Src,
    		Fullstack,
    		Cybersecurity,
    		Theory,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url];
    }

    class Routes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Routes",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get url() {
    		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/navbar.svelte generated by Svelte v3.51.0 */
    const file$1 = "src/navbar.svelte";

    function create_fragment$1(ctx) {
    	let div6;
    	let br;
    	let t0;
    	let h1;
    	let t2;
    	let nav;
    	let div0;
    	let a0;
    	let img;
    	let img_src_value;
    	let t3;
    	let div2;
    	let router;
    	let div1;
    	let a1;
    	let t5;
    	let a2;
    	let t7;
    	let a3;
    	let t9;
    	let div5;
    	let div4;
    	let div3;
    	let p0;
    	let a4;
    	let span0;
    	let t11;
    	let p1;
    	let a5;
    	let span1;

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			br = element("br");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "HOW TO SURVIVE CS@WPI";
    			t2 = space();
    			nav = element("nav");
    			div0 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t3 = space();
    			div2 = element("div");
    			router = element("router");
    			div1 = element("div");
    			a1 = element("a");
    			a1.textContent = "Full Stack/Design";
    			t5 = space();
    			a2 = element("a");
    			a2.textContent = "Theory";
    			t7 = space();
    			a3 = element("a");
    			a3.textContent = "Cybersecurity";
    			t9 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			p0 = element("p");
    			a4 = element("a");
    			span0 = element("span");
    			span0.textContent = "LOGIN";
    			t11 = space();
    			p1 = element("p");
    			a5 = element("a");
    			span1 = element("span");
    			span1.textContent = "REGISTER";
    			add_location(br, file$1, 18, 4, 402);
    			attr_dev(h1, "class", "title has-text-centered");
    			add_location(h1, file$1, 19, 4, 411);
    			if (!src_url_equal(img.src, img_src_value = "https://cdn-icons-png.flaticon.com/512/5766/5766858.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$1, 23, 16, 684);
    			attr_dev(a0, "class", "navbar-item");
    			attr_dev(a0, "href", "https://cs4241-havanahail-sandysandysand.glitch.me");
    			attr_dev(a0, "id", "nav_icon");
    			add_location(a0, file$1, 22, 12, 572);
    			attr_dev(div0, "class", "navbar-brand");
    			add_location(div0, file$1, 21, 8, 533);
    			attr_dev(a1, "class", "navbar-item");
    			attr_dev(a1, "id", "full_stack_nav");
    			attr_dev(a1, "href", "https://cs4241-havanahail-sandysandysand.glitch.me/fullstack");
    			add_location(a1, file$1, 29, 16, 892);
    			attr_dev(a2, "class", "navbar-item");
    			attr_dev(a2, "id", "theory_nav");
    			attr_dev(a2, "href", "https://cs4241-havanahail-sandysandysand.glitch.me/theory");
    			add_location(a2, file$1, 32, 16, 1085);
    			attr_dev(a3, "class", "navbar-item");
    			attr_dev(a3, "id", "cyber_nav");
    			attr_dev(a3, "href", "https://cs4241-havanahail-sandysandysand.glitch.me/cybersecurity");
    			add_location(a3, file$1, 35, 16, 1256);
    			attr_dev(div1, "class", "navbar-start");
    			add_location(div1, file$1, 28, 12, 849);
    			add_location(router, file$1, 27, 10, 828);
    			attr_dev(div2, "class", "navbar-menu");
    			add_location(div2, file$1, 26, 8, 792);
    			add_location(span0, file$1, 46, 24, 1738);
    			attr_dev(a4, "class", "button is-primary");
    			attr_dev(a4, "href", "#");
    			attr_dev(a4, "id", "login_nav");
    			add_location(a4, file$1, 45, 24, 1660);
    			attr_dev(p0, "class", "control");
    			add_location(p0, file$1, 44, 20, 1616);
    			add_location(span1, file$1, 51, 24, 1953);
    			attr_dev(a5, "class", "button is-dark");
    			attr_dev(a5, "href", "#");
    			attr_dev(a5, "id", "register_nav");
    			add_location(a5, file$1, 50, 24, 1875);
    			attr_dev(p1, "class", "control");
    			add_location(p1, file$1, 49, 20, 1831);
    			attr_dev(div3, "class", "field is-grouped");
    			add_location(div3, file$1, 43, 16, 1565);
    			attr_dev(div4, "class", "navbar-item");
    			add_location(div4, file$1, 42, 12, 1523);
    			attr_dev(div5, "class", "navbar-end");
    			add_location(div5, file$1, 41, 8, 1486);
    			attr_dev(nav, "class", "navbar is-link");
    			attr_dev(nav, "role", "navigation");
    			add_location(nav, file$1, 20, 4, 478);
    			attr_dev(div6, "class", "container is-fixed-top is-fluid");
    			attr_dev(div6, "id", "navbar");
    			add_location(div6, file$1, 17, 0, 340);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, br);
    			append_dev(div6, t0);
    			append_dev(div6, h1);
    			append_dev(div6, t2);
    			append_dev(div6, nav);
    			append_dev(nav, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img);
    			append_dev(nav, t3);
    			append_dev(nav, div2);
    			append_dev(div2, router);
    			append_dev(router, div1);
    			append_dev(div1, a1);
    			append_dev(div1, t5);
    			append_dev(div1, a2);
    			append_dev(div1, t7);
    			append_dev(div1, a3);
    			append_dev(nav, t9);
    			append_dev(nav, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, p0);
    			append_dev(p0, a4);
    			append_dev(a4, span0);
    			append_dev(div3, t11);
    			append_dev(div3, p1);
    			append_dev(p1, a5);
    			append_dev(a5, span1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);

    	function update(nav) {
    		if (nav == 1) {
    			menu.update(n => 1);
    		} else if (nav == 2) {
    			menu.update(n => 2);
    		} else if (nav == 3) {
    			menu.update(n => 3);
    		} else {
    			menu.update(n => 0);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ menu, Router: Routes, update });
    	return [];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src.svelte generated by Svelte v3.51.0 */
    const file = "src.svelte";

    function create_fragment(ctx) {
    	let meta0;
    	let meta1;
    	let link0;
    	let link1;
    	let t0;
    	let navbar;
    	let t1;
    	let index;

    	const block = {
    		c: function create() {
    			meta0 = element("meta");
    			meta1 = element("meta");
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			navbar = element("navbar");
    			t1 = space();
    			index = element("index");
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file, 70, 1, 2345);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1");
    			add_location(meta1, file, 71, 8, 2376);
    			document.title = "How to Survive CS@WPI";
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css");
    			add_location(link0, file, 73, 8, 2498);
    			attr_dev(link1, "rel", "icon");
    			attr_dev(link1, "type", "image/x-icon");
    			attr_dev(link1, "href", "https://cdn-icons-png.flaticon.com/512/5766/5766858.png");
    			add_location(link1, file, 74, 8, 2596);
    			add_location(navbar, file, 77, 0, 2713);
    			add_location(index, file, 78, 0, 2744);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, meta0);
    			append_dev(document.head, meta1);
    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, navbar, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, index, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(meta0);
    			detach_dev(meta1);
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(navbar);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(index);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navbar,
    		Router: Routes,
    		Index: Src,
    		Fullstack,
    		Cybersecurity,
    		Theory
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    window.app = app;

    return app;

})(svelteRouting);
//# sourceMappingURL=bundle.js.map
