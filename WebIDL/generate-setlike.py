import os

here = os.path.dirname(__file__)

readonly_template = """\
interface ReadOnly {{
  readonly setlike<DOMString>;
}};

interface {interface}A {{
  readonly setlike<DOMString>;
  static void {method}();
}};

interface {interface}B {{
  readonly setlike<DOMString>;
  static readonly attribute long {method};
}};

interface {interface}C : ReadOnly {{
  void {method}();
}};

interface {interface}D : ReadOnly {{
  readonly attribute long {method};
}};

interface {interface}E : ReadOnly {{
  const long {method} = 0;
}};
"""

readwrite_template = """\
interface ReadOnly {{
  readonly setlike<DOMString>;
}};

interface ReadWrite {{
  setlike<DOMString>;
}};

interface {interface}A {{
  setlike<DOMString>;
  void {method}();
}};

interface {interface}B {{
  readonly setlike<DOMString>;
  void {method}();
}};

interface {interface}C {{
  readonly setlike<DOMString>;
  readonly attribute long {method};
}};

interface {interface}D {{
  readonly setlike<DOMString>;
  const long {method} = 0;
}};

interface {interface}E : ReadOnly {{
  void {method}();
}};

interface {interface}F : ReadOnly {{
  readonly attribute long {method};
}};

interface {interface}G : ReadOnly {{
  const long {method} = 0;
}};

interface {interface}H : ReadWrite {{
  void {method}();
}};

interface {interface}I : ReadWrite {{
  readonly attribute long {method};
}};

interface {interface}J : ReadWrite {{
  const long {method} = 0;
}};

interface {interface}K {{
  readonly setlike<DOMString>;
  static void {method}();
}};

interface {interface}L {{
  readonly setlike<DOMString>;
  static readonly attribute long {method};
}};

interface {interface}M1 {{
  static void {method}();
}};

interface {interface}M2 : {interface}M1 {{
  readonly setlike<DOMString>;
}};

interface {interface}N1 {{
  static readonly attribute long {method};
}};

interface {interface}N2 : {interface}N1 {{
  readonly setlike<DOMString>;
}};
"""

members_readonly = [
    "entries",
    "forEach",
    "has",
    "keys",
    "size",
    "values",
]

members_readwrite = [
    "add",
    "clear",
    "delete",
]

def transform(m):
    return m[0].upper() + m[1:]

tests = [
    (members_readonly, readonly_template),
    (members_readwrite, readwrite_template),
]

for (members, template) in tests:
    for method in members:
        path = "{here}/valid/idl/setlike-{method}.widl".format(here=here, method=method)
        test = template.format(method=method, interface=transform(method))
        with open(path, "wb") as f:
            f.write(test.encode("utf8"))
